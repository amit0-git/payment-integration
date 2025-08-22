// server/src/routes/payment.routes.js
import express from "express";
import bodyParser from "body-parser";
import Order from "../models/Order.js";
import { createRazorpayOrder } from "../services/razorpay.js";
import { verifyPaymentSignature, verifyWebhookSignature } from "../utils/verify.js";

const router = express.Router();





const products = [
  {
    id: 1,
    name: 'Wireless Headphones',
    price: 2999,
    description: 'High-quality wireless headphones',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop'
  },
  {
    id: 2,
    name: 'Smart Watch',
    price: 4999,
    description: 'Fitness tracking smartwatch',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=300&fit=crop'
  },
  {
    id: 3,
    name: 'T-Shirt',
    price: 799,
    description: 'Comfortable cotton t-shirt',
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=300&fit=crop'
  },
  {
    id: 4,
    name: 'Water Bottle',
    price: 599,
    description: 'Stainless steel water bottle',
    image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=400&h=300&fit=crop'
  },
  {
    id: 5,
    name: 'Bluetooth Speaker',
    price: 1499,
    description: 'Portable wireless speaker',
    image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=300&fit=crop'
  },
  {
    id: 6,
    name: 'Wallet',
    price: 899,
    description: 'Genuine leather wallet',
    image: 'https://images.unsplash.com/photo-1627123424574-724758594e93?w=400&h=300&fit=crop'
  }
]
// Create order
router.post("/orders", async (req, res) => {
  try {
    const { userId, productId, customerInfo, cartItems } = req.body; // Add cartItems
    
    // Validate input
    if (!productId || !userId || !cartItems) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Calculate amount server-side from products array
    const productIds = productId.split(',');
    let subtotal = 0;
    
    // Match cart items with products array
    cartItems.forEach(cartItem => {
      const product = products.find(p => p.id.toString() === cartItem.id.toString());
      if (product) {
        subtotal += product.price * cartItem.quantity; // Use quantity from cart
      }
    });
    
    const tax = Math.round(subtotal * 0.18);
    const total = subtotal + tax;
    
    // Verify the calculated amount
    if (total <= 0) {
      return res.status(400).json({ error: "Invalid order amount" });
    }

    const order = await createRazorpayOrder({
      amount: Math.round(total * 100), // Convert to paise
      currency: "INR",
      receipt: `rcpt_${Date.now()}`,
      notes: { userId, productId, customerInfo },
    });

    // Save order with server-calculated amount
    await Order.create({
      orderId: order.id,
      amount: order.amount, // This is the verified amount
      currency: order.currency,
      notes: order.notes,
      userId,
      productId,
      calculatedAmount: total, // Store for verification
    });

    res.json({
      id: order.id,
      amount: order.amount,
      currency: order.currency,
      key: process.env.RAZORPAY_KEY_ID,
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Order creation failed" });
  }
});

// Client-side success verification (fast UX)
router.post("/verify", express.json(), async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature)
      return res.status(400).json({ ok: false, error: "Missing fields" });

    const ok = verifyPaymentSignature(
      {
        orderId: razorpay_order_id,
        paymentId: razorpay_payment_id,
        signature: razorpay_signature,
      },
      process.env.RAZORPAY_SECRET
    );

    if (!ok) return res.status(400).json({ ok: false, error: "Signature mismatch" });

    // Mark ATTEMPTED/PAID optimistically; final truth via webhook
    const doc = await Order.findOneAndUpdate(
      { orderId: razorpay_order_id },
      {
        status: "ATTEMPTED",
        paymentId: razorpay_payment_id,
        signature: razorpay_signature,
      },
      { new: true }
    );

    return res.json({ ok: true, status: doc?.status || "ATTEMPTED" });
  } catch (e) {
    console.error(e);
    res.status(500).json({ ok: false, error: "Verification failed" });
  }
});

// Webhook (source of truth)
router.post(
  "/webhook",
  // Razorpay requires the raw body for signature verification
  bodyParser.raw({ type: "application/json" }),
  async (req, res) => {
    try {
      const razorpaySignature = req.headers["x-razorpay-signature"];
      const isValid = verifyWebhookSignature(
        req.body, // raw Buffer
        razorpaySignature,
        process.env.RAZORPAY_WEBHOOK_SECRET
      );

      if (!isValid) {
        return res.status(400).send("Invalid signature");
      }

      const payload = JSON.parse(req.body.toString("utf8"));
      const event = payload.event;

      // Record webhook
      const ent = payload.payload?.payment?.entity || payload.payload?.order?.entity || {};
      const orderId = ent.order_id || payload.payload?.order?.entity?.id;

      if (orderId) {
        const update = { $push: { webhookEvents: { event, payload } } };

        if (event === "payment.captured") {
          update.$set = { status: "PAID", paymentId: ent.id };
        } else if (event === "payment.failed") {
          update.$set = { status: "FAILED" };
        } else if (event === "refund.processed") {
          update.$set = { status: "REFUNDED" };
        }

        await Order.findOneAndUpdate({ orderId }, update, { new: true });
      }

      res.status(200).send("ok");
    } catch (e) {
      console.error(e);
      res.status(500).send("Webhook error");
    }
  }
);

// Optional: fetch order status
router.get("/orders/:orderId", async (req, res) => {
  const doc = await Order.findOne({ orderId: req.params.orderId });
  if (!doc) return res.status(404).json({ error: "Order not found" });
  res.json(doc);
});

export default router;
