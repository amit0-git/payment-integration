import React from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'



// thse products are fetched from the backend db
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





const HomePage = () => {
  const { addToCart, getTotalItems } = useCart()

  const handleAddToCart = (product) => {
    addToCart(product)
  }

  return (
    <div>
      {/* Header */}
      <header className="header">
        <div className="container">
          <div className="header-content">
            <h1 className="header-title">ShopHub</h1>
            <Link to="/cart" className="btn btn-primary">
              Cart ({getTotalItems()})
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container">
        <h2 className="mb-20">Products</h2>
        
        <div className="products-grid">
          {products.map((product) => (
            <div key={product.id} className="product-card">
              <img 
                src={product.image} 
                alt={product.name}
                className="product-image"
              />
              <div className="product-name">{product.name}</div>
              <div className="product-price">₹{product.price}</div>
              <div className="product-description">{product.description}</div>
              <button
                onClick={() => handleAddToCart(product)}
                className="btn btn-primary"
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default HomePage
