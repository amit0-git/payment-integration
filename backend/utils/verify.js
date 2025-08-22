
import crypto from "crypto";

export const verifyPaymentSignature = ({ orderId, paymentId, signature }, secret) => {
  const body = `${orderId}|${paymentId}`;
  const expected = crypto.createHmac("sha256", secret).update(body).digest("hex");
  return expected === signature;
};

export const verifyWebhookSignature = (rawBody, razorpaySignature, webhookSecret) => {
  const expected = crypto.createHmac("sha256", webhookSecret).update(rawBody).digest("hex");
  return expected === razorpaySignature;
};
