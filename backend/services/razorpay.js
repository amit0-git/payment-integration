// server
import Razorpay from "razorpay";

export const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_SECRET,
});

export const createRazorpayOrder = async ({ amount, currency = "INR", receipt, notes }) => {
  // amount must be in paise
  return await razorpay.orders.create({
    amount,
    currency,
    receipt,
    notes,
    // payment_capture: 1 // Auto-capture (default for Checkout)
  });
};
