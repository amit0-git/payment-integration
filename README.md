# 🛒 ShopHub - E-commerce Payment Integration

A modern, full-stack e-commerce application with seamless Razorpay payment integration, built with React, Node.js, and MongoDB.

![ShopHub Banner](https://img.shields.io/badge/ShopHub-E--commerce%20Payment%20App-blue?style=for-the-badge&logo=shopping-cart)

## ✨ Features

- ��️ **Product Catalog**: Browse through a curated collection of products
- �� **Shopping Cart**: Add/remove items with real-time cart management
- 💳 **Secure Payments**: Integrated Razorpay payment gateway
- 🔐 **Payment Verification**: Server-side signature verification for security
- 📱 **Responsive Design**: Mobile-first, modern UI/UX
- 🚀 **Real-time Updates**: Live cart updates and order tracking
- 🎯 **User Experience**: Intuitive navigation and smooth checkout flow

## 🖼️ Screenshots

### Homepage
<img width="800" height="400" alt="homepage" src="https://github.com/user-attachments/assets/d55a331b-deea-4011-9433-13446b487772" />

### Shopping Cart
<img width="800" height="400" alt="cart" src="https://github.com/user-attachments/assets/f6e2fa19-8e0b-45c0-a7b9-62b2690474ec" />

### Checkout Process
<img width="800" height="400" alt="checkout" src="https://github.com/user-attachments/assets/36f94f85-7b37-4f7d-bfa3-5957ee77845e" />

### Payment Success
<img width="800" height="400" alt="razorpay-1" src="https://github.com/user-attachments/assets/fbc5fc57-12eb-4cc6-b295-570725992045" />
<img width="800" height="400" alt="Screenshot (130)" src="https://github.com/user-attachments/assets/aa6976f7-abdd-45f9-bb5e-b1f793c2102e" />
<img width="800" height="400" alt="Screenshot (131)" src="https://github.com/user-attachments/assets/ebba6dc3-9201-4a7e-98f9-ac1e9b72507d" />


## 🚀 Tech Stack

### Frontend
- **React 19** - Modern React with latest features
- **Vite** - Fast build tool and dev server
- **React Router** - Client-side routing
- **Heroicons** - Beautiful SVG icons
- **Axios** - HTTP client for API calls
- **Context API** - State management

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **Razorpay** - Payment gateway integration
- **Helmet** - Security middleware
- **CORS** - Cross-origin resource sharing

## 📋 Prerequisites

Before running this application, make sure you have:

- **Node.js** (v18 or higher)
- **MongoDB** (local installation or MongoDB Atlas)
- **Razorpay Account** with API keys
- **Git** for version control

## ��️ Installation

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/payment_integration.git
cd payment_integration
```

### 2. Backend Setup
```bash
cd backend
npm install
```

Create a `.env` file in the backend directory:
```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
CLIENT_URL=http://localhost:3000
```

### 3. Frontend Setup
```bash
cd ../frontend
npm install
```

### 4. Start the Application

**Terminal 1 - Backend:**
```bash
cd backend
npm start
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

The application will be available at:
- **Frontend**: http://localhost:3000
- **Backend**: http://localhost:5000

## �� Configuration

### Environment Variables

Create a `.env` file in the backend directory with the following variables:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database
MONGODB_URI=mongodb://localhost:27017/shopHub

# Razorpay Configuration
RAZORPAY_KEY_ID=rzp_test_your_key_id
RAZORPAY_KEY_SECRET=your_key_secret

# Client Configuration
CLIENT_URL=http://localhost:3000
```

### Razorpay Setup

1. Sign up for a [Razorpay Account](https://razorpay.com/)
2. Get your API keys from the dashboard
3. Add the keys to your `.env` file
4. For testing, use Razorpay's test mode

## 📱 Usage

### 1. Browse Products
- Visit the homepage to see available products
- Each product displays name, price, description, and image

### 2. Add to Cart
- Click "Add to Cart" on any product
- Cart icon shows the total number of items
- Navigate to cart to review items

### 3. Checkout
- Review cart items and quantities
- Click "Proceed to Checkout"
- Fill in customer information
- Complete payment via Razorpay

### 4. Payment
- Choose payment method (cards, UPI, net banking)
- Enter payment details
- Complete the transaction
- Receive order confirmation

## 🔐 Security Features

- **Payment Verification**: Server-side signature verification
- **Webhook Security**: Secure webhook handling
- **Input Validation**: Server-side validation for all inputs
- **CORS Protection**: Configured cross-origin policies
- **Helmet Security**: Security headers middleware

## API Endpoints

### Payment Routes
- `POST /api/payment/orders` - Create new order
- `POST /api/payment/verify` - Verify payment signature
- `POST /api/payment/webhook` - Handle payment webhooks

### Order Management
- `GET /api/orders` - Get all orders
- `GET /api/orders/:id` - Get specific order
- `PUT /api/orders/:id` - Update order status



## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request


## 📞 Support

If you have any questions or need help:

- �� Email: root.avanti@gmail.com
- 🐛 Issues: [GitHub Issues](https://github.com/amit0-git/payment-integration/issues)
- 📖 Documentation: [Wiki](https://github.com/amit0-git/payment-integration/wiki)

## ⭐ Star the Repository

If you find this project helpful, please give it a ⭐ star on GitHub!

---

**Built with ❤️ by [Your Name]**

*Last updated: December 2024*
