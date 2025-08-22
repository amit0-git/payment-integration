import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import axios from 'axios'

const Checkout = () => {
  const { items, getTotalPrice, clearCart } = useCart()
  const navigate = useNavigate()
  const [isProcessing, setIsProcessing] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [orderDetails, setOrderDetails] = useState(null)
  const [countdown, setCountdown] = useState(5) // Add countdown state
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    email: '',
    phone: '',
    address: ''
  })

  const subtotal = getTotalPrice()
  const tax = Math.round(subtotal * 0.18)
  const total = subtotal + tax

  // Countdown effect
  useEffect(() => {
    let timer
    if (showSuccess && countdown > 0) {
      timer = setTimeout(() => {
        setCountdown(countdown - 1)
      }, 1000)
    } else if (showSuccess && countdown === 0) {
      navigate('/')
    }
    return () => clearTimeout(timer)
  }, [showSuccess, countdown, navigate])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setCustomerInfo(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handlePayment = async () => {
    if (!customerInfo.name || !customerInfo.email || !customerInfo.phone || !customerInfo.address) {
      alert('Please fill in all required fields')
      return
    }

    setIsProcessing(true)

    try {
      // Create order on server
      const { data: order } = await axios.post(
        "http://localhost:5000/api/payment/orders",
        { 
          userId: Date.now().toString(),
          productId: items.map(item => item.id).join(','),
          cartItems: items,
          customerInfo
        }
      )

      // Open Razorpay Checkout
      const options = {
        key: order.key,
        order_id: order.id,
        amount: order.amount,
        currency: order.currency,
        name: "ShopHub",
        description: `Order for ${items.length} items`,
        prefill: {
          name: customerInfo.name,
          email: customerInfo.email,
          contact: customerInfo.phone,
        },
        theme: { color: "#007bff" },
        handler: async function (response) {
          try {
            // Verify payment
            const verifyRes = await axios.post("http://localhost:5000/api/payment/verify", {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            })

            if (verifyRes.data.ok) {
              // Store order details before clearing cart
              setOrderDetails({
                total: total,
                itemCount: items.length,
                orderId: order.id
              })
              
              // Show success message and start countdown
              setShowSuccess(true)
              setCountdown(5) // Reset countdown
              
              // Clear cart after storing details
              clearCart()
              
              // Remove the setTimeout since we're using useEffect now
            } else {
              alert("Payment verification failed. Please contact support.")
            }
          } catch (error) {
            console.error('Verification error:', error)
            alert("Payment verification failed. Please contact support.")
          }
        },
        modal: {
          ondismiss: function () {
            console.log("Checkout closed")
            setIsProcessing(false)
          },
        },
        notes: { 
          userId: Date.now().toString(), 
          productId: items.map(item => item.id).join(','),
          customerInfo: JSON.stringify(customerInfo)
        },
      }

      const rzp = new window.Razorpay(options)
      rzp.open()
      
    } catch (error) {
      console.error('Payment error:', error)
      alert("Failed to create order. Please try again.")
      setIsProcessing(false)
    }
  }

  if (items.length === 0 && !showSuccess) {
    return (
      <div className="empty-state">
        <div className="empty-state-emoji">��</div>
        <h2>Your cart is empty</h2>
        <p>Please add some products to your cart first.</p>
        <Link to="/" className="btn btn-primary">
          Continue Shopping
        </Link>
      </div>
    )
  }

  return (
    <div>
      {/* Header */}
      <header className="header">
        <div className="container">
          <div className="header-content">
            <Link to="/cart" className="btn btn-primary">
              Back to Cart
            </Link>
            <h1 className="header-title">Checkout</h1>
            <div></div>
          </div>
        </div>
      </header>

      {/* Success Message - Above Checkout Section */}
      {showSuccess && (
        <div className="success-banner">
          <div className="container">
            <div className="success-content">
              <div className="success-icon">✅</div>
              <div className="success-text">
                <h3>Payment Successful!</h3>
                <p>Your order has been placed successfully. Redirecting to home page in <strong>{countdown}</strong> seconds...</p>
                <div className="success-details">
                  <span><strong>Order Total:</strong> ₹{orderDetails?.total}</span>
                  <span><strong>Items:</strong> {orderDetails?.itemCount}</span>
                  <span><strong>Order ID:</strong> {orderDetails?.orderId}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Content - Only show if not success or if cart has items */}
      {(!showSuccess || items.length > 0) && (
        <div className="container">
          <div className="checkout-grid">
            {/* Customer Information */}
            <div>
              <div className="order-summary">
                <h3>Customer Information</h3>
                <div className="form-group">
                  <label className="form-label">Full Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={customerInfo.name}
                    onChange={handleInputChange}
                    className="form-input"
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Email Address *</label>
                  <input
                    type="email"
                    name="email"
                    value={customerInfo.email}
                    onChange={handleInputChange}
                    className="form-input"
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Phone Number *</label>
                  <input
                    type="tel"
                    name="phone"
                    value={customerInfo.phone}
                    onChange={handleInputChange}
                    className="form-input"
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Delivery Address *</label>
                  <textarea
                    name="address"
                    value={customerInfo.address}
                    onChange={handleInputChange}
                    className="form-input form-textarea"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Order Summary & Payment */}
            <div>
              <div className="order-summary">
                <h3>Order Summary</h3>
                
                {/* Order Items */}
                <div className="mb-20">
                  {items.map((item) => (
                    <div key={item.id} className="cart-item">
                      <img
                        src={item.image}
                        alt={item.name}
                        style={{ width: '40px', height: '40px' }}
                      />
                      <div className="cart-item-info">
                        <div className="cart-item-name">{item.name}</div>
                        <div className="cart-item-price">Qty: {item.quantity}</div>
                      </div>
                      <div className="cart-item-price">₹{item.price * item.quantity}</div>
                    </div>
                  ))}
                </div>

                {/* Price Breakdown */}
                <div className="summary-row">
                  <span>Subtotal:</span>
                  <span>₹{subtotal}</span>
                </div>
                <div className="summary-row">
                  <span>Tax (18%):</span>
                  <span>₹{tax}</span>
                </div>
                <div className="summary-row">
                  <span>Shipping:</span>
                  <span>Free</span>
                </div>
                
                <div className="summary-total">
                  <span>Total:</span>
                  <span>₹{total}</span>
                </div>

                {/* Payment Button */}
                <button
                  onClick={handlePayment}
                  disabled={isProcessing}
                  className="btn btn-primary"
                  style={{ width: '100%', marginTop: '20px' }}
                >
                  {isProcessing ? 'Processing...' : `Pay ₹${total}`}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Checkout