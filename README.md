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
![Homepage](https://via.placeholder.com/800x500/4F46E5/FFFFFF?text=ShopHub+Homepage)
*Browse products and add them to your cart*

### Shopping Cart
![Shopping Cart](https://via.placeholder.com/800x500/10B981/FFFFFF?text=Shopping+Cart)
*Manage your cart items before checkout*

### Checkout Process
![Checkout](https://via.placeholder.com/800x500/F59E0B/FFFFFF?text=Checkout+Process)
*Secure payment flow with Razorpay integration*

### Payment Success
![Payment Success](https://via.placeholder.com/800x500/059669/FFFFFF?text=Payment+Success)
*Order confirmation and success page*

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

## �� API Endpoints

### Payment Routes
- `POST /api/payment/orders` - Create new order
- `POST /api/payment/verify` - Verify payment signature
- `POST /api/payment/webhook` - Handle payment webhooks

### Order Management
- `GET /api/orders` - Get all orders
- `GET /api/orders/:id` - Get specific order
- `PUT /api/orders/:id` - Update order status

## ��️ Database Schema

### Order Model
```javascript
{
  orderId: String,        // Razorpay order ID
  amount: Number,          // Order amount in paise
  currency: String,        // Currency code (INR)
  status: String,          // Order status
  notes: Object,           // Additional order details
  createdAt: Date          // Order creation timestamp
}
```

## 🧪 Testing

### Test Cards (Razorpay Test Mode)
- **Success**: 4111 1111 1111 1111
- **Failure**: 4000 0000 0000 0002
- **CVV**: Any 3 digits
- **Expiry**: Any future date

## 🚀 Deployment

### Backend Deployment
1. Set up environment variables on your hosting platform
2. Deploy to platforms like:
   - **Heroku**
   - **Railway**
   - **Render**
   - **DigitalOcean App Platform**

### Frontend Deployment
1. Build the application: `npm run build`
2. Deploy the `dist` folder to:
   - **Vercel**
   - **Netlify**
   - **GitHub Pages**
   - **Firebase Hosting**

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## �� Acknowledgments

- **Razorpay** for payment gateway integration
- **React Team** for the amazing framework
- **Vite** for the fast build tool
- **MongoDB** for the database solution

## 📞 Support

If you have any questions or need help:

- �� Email: your.email@example.com
- 🐛 Issues: [GitHub Issues](https://github.com/yourusername/payment_integration/issues)
- 📖 Documentation: [Wiki](https://github.com/yourusername/payment_integration/wiki)

## ⭐ Star the Repository

If you find this project helpful, please give it a ⭐ star on GitHub!

---

**Built with ❤️ by [Your Name]**

*Last updated: December 2024*