// server/src/db/models/Order.js
import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    orderId: { type: String, index: true, unique: true }, // razorpay_order_id
    amount: Number,                // in paise
    currency: { type: String, default: "INR" },
    status: {
      type: String,
      enum: ["CREATED", "ATTEMPTED", "PAID", "FAILED", "REFUNDED"],
      default: "CREATED",
      index: true,
    },
    notes: mongoose.Schema.Types.Mixed, // any metadata you send to Razorpay
    // Payment payloads
    paymentId: String,                  // razorpay_payment_id
    signature: String,                  // razorpay_signature (client verification)
    webhookEvents: [
      {
        event: String,
        payload: mongoose.Schema.Types.Mixed,
        at: { type: Date, default: Date.now },
      },
    ],
    // Your business fields
    userId: String,
    productId: String,
  },
  { timestamps: true }
);

export default mongoose.model("Order", orderSchema);
