import React from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'

const Cart = () => {
  const { items, removeFromCart, updateQuantity, getTotalPrice, clearCart } = useCart()

  if (items.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-state-emoji">🛒</div>
        <h2>Your cart is empty</h2>
        <p>Add some products to your cart first.</p>
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
            <Link to="/" className="btn btn-primary">
              Back to Shop
            </Link>
            <h1 className="header-title">Shopping Cart</h1>
            <button onClick={clearCart} className="btn btn-danger">
              Clear Cart
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container">
        <div className="checkout-grid">
          {/* Cart Items */}
          <div>
            <h3 className="mb-20">Cart Items ({items.length})</h3>
            
            {items.map((item) => (
              <div key={item.id} className="cart-item">
                <img
                  src={item.image}
                  alt={item.name}
                />
                <div className="cart-item-info">
                  <div className="cart-item-name">{item.name}</div>
                  <div className="cart-item-price">₹{item.price}</div>
                </div>
                <div className="quantity-controls">
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="quantity-btn"
                  >
                    -
                  </button>
                  <span className="quantity-display">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="quantity-btn"
                  >
                    +
                  </button>
                </div>
                <div className="cart-item-price">₹{item.price * item.quantity}</div>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="btn btn-danger"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div>
            <div className="order-summary">
              <h3>Order Summary</h3>
              
              <div className="summary-row">
                <span>Subtotal:</span>
                <span>₹{getTotalPrice()}</span>
              </div>
              <div className="summary-row">
                <span>Tax (18%):</span>
                <span>₹{Math.round(getTotalPrice() * 0.18)}</span>
              </div>
              <div className="summary-row">
                <span>Shipping:</span>
                <span>Free</span>
              </div>
              
              <div className="summary-total">
                <span>Total:</span>
                <span>₹{getTotalPrice() + Math.round(getTotalPrice() * 0.18)}</span>
              </div>
              
              <Link
                to="/checkout"
                className="btn btn-primary"
                style={{ width: '100%', marginTop: '20px' }}
              >
                Proceed to Checkout
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart
