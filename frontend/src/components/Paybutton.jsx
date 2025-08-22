
import axios from "axios";

export default function PayButton({ rupees = 499, userId, productId }) {
  const startPayment = async () => {
    // 1) Create order on server
    const { data: order } = await axios.post(
      "http://localhost:5000/api/payment/orders",
      { amount: rupees, userId, productId }
    );

    

    // 2) Open Razorpay Checkout
    const options = {
      key: order.key,
      order_id: order.id,
      amount: order.amount, // paise
      currency: order.currency,
      name: "Your App",
      description: "Purchase",
      prefill: {
        name: "Amit Verma",
        email: "amit@example.com",
        contact: "9999999999",
      },
      theme: { color: "#0ea5e9" },
      handler: async function (response) {
        // 3) Verify immediately (fast UX)
        const verifyRes = await axios.post("http://localhost:5000/api/payment/verify", {
          razorpay_order_id: response.razorpay_order_id,
          razorpay_payment_id: response.razorpay_payment_id,
          razorpay_signature: response.razorpay_signature,
        });

        if (verifyRes.data.ok) {
          // Show success, but still poll order status or rely on webhook-driven UI
          alert("Payment submitted! We'll confirm shortly.");
        } else {
          alert("Verification failed. Please contact support.");
        }
      },
      modal: {
        ondismiss: function () {
          console.log("Checkout closed");
        },
      },
      // (Optional) notes you want in Razorpay Dashboard
      notes: { userId, productId },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return (
    <button onClick={startPayment}>
      Pay ₹{rupees}
    </button>
  );
}
