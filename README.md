# FashionNow E-Commerce

**FashionNow** is a modern, responsive e-commerce platform built with **Angular 17+** frontend, **Node.js/Express** backend, and **MongoDB** database. It features a complete shopping experience with product browsing, cart management, multiple payment options, and a comprehensive admin panel.

## Features

### User Features:
- **Product Browsing**: View products with filtering, sorting, and search functionality
- **User Authentication**: Register, login, and profile management
- **Shopping Cart**: Add/remove products, update quantities
- **Multiple Payment Methods**: 
  - Cash on Delivery (COD)
  - Stripe Payment Gateway
  - Razorpay Payment Gateway
- **Order Management**: View order history, track orders, cancel orders (within 24 hours)
- **Responsive Design**: Mobile-first design with TailwindCSS

### Admin Features:
- **Product Management**: Add, list, and delete products with image upload
- **Order Management**: View all orders, update order status
- **Dashboard**: Complete overview of orders and products
- **Cloudinary Integration**: Image storage and management

## Tech Stack

### Frontend (Angular)
- Angular 17+ with Standalone Components
- Signals for reactive state management
- TailwindCSS 3.4.1 for styling
- HttpClient for API communication
- Route guards for authentication

### Admin Panel (Angular)
- Separate Angular application
- Product and order management
- Image upload with Cloudinary

### Backend
- Node.js & Express.js
- MongoDB with Mongoose
- JWT Authentication
- Cloudinary for image storage
- Razorpay & Stripe payment integration

## Project Setup

### Prerequisites
- Node.js (v18 or above)
- MongoDB (local or cloud)
- npm or yarn

### Clone the repository
```bash
git clone https://github.com/KhushalRathod1207/FashionNow-E-Commerce.git
cd FashionNow-E-Commerce
```

### Backend Setup

1. Navigate to backend directory:
```bash
cd backend
npm install
```

2. Create `.env` file in `backend` directory:
```env
MONGODB_URI=your_mongodb_connection_string
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_SECRET_KEY=your_cloudinary_secret
CLOUDINARY_NAME=your_cloudinary_name
JWT_SECRET=your_jwt_secret
ADMIN_EMAIL=admin@fashionnow.com
ADMIN_PASSWORD=admin123
STRIPE_SECRET_KEY=your_stripe_secret_key
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_secret
PORT=4000
```

3. Start backend server:
```bash
npm run server
```
Backend runs on `http://localhost:4000`

### Frontend Setup (Angular)

1. Navigate to frontend directory:
```bash
cd frontend-angular
npm install
```

2. Update environment file if needed:
```typescript
// src/environments/environment.ts
export const environment = {
  production: false,
  backendUrl: 'http://localhost:4000',
  razorpayKeyId: 'your_razorpay_key_id'
};
```

3. Start frontend server:
```bash
npm start
```
Frontend runs on `http://localhost:4200`

### Admin Panel Setup (Angular)

1. Navigate to admin directory:
```bash
cd admin-angular-complete
npm install
```

2. Start admin server:
```bash
npm start
```
Admin panel runs on `http://localhost:4201`

## Project Structure

```
FashionNow-E-Commerce/
├── backend/                 # Node.js/Express backend
│   ├── controllers/         # Request handlers
│   ├── models/             # MongoDB models
│   ├── routes/             # API routes
│   ├── middleware/         # Auth & validation
│   └── config/             # Database & Cloudinary config
├── frontend-angular/       # Angular user frontend
│   ├── src/
│   │   ├── app/
│   │   │   ├── components/ # Reusable components
│   │   │   ├── pages/      # Page components
│   │   │   ├── services/   # API services
│   │   │   └── models/     # TypeScript interfaces
│   │   └── assets/         # Images & static files
└── admin-angular-complete/ # Angular admin panel
    └── src/
        ├── app/
        │   ├── components/ # Admin components
        │   ├── pages/      # Admin pages
        │   └── services/   # Admin services
        └── assets/         # Admin assets
```

## API Endpoints

### User Routes
- `POST /api/user/register` - User registration
- `POST /api/user/login` - User login
- `POST /api/user/data` - Get user data

### Product Routes
- `GET /api/product/list` - Get all products
- `POST /api/product/add` - Add product (Admin)
- `POST /api/product/remove` - Remove product (Admin)

### Cart Routes
- `POST /api/cart/add` - Add to cart
- `POST /api/cart/update` - Update cart
- `POST /api/cart/get` - Get user cart

### Order Routes
- `POST /api/order/place` - Place COD order
- `POST /api/order/stripe` - Place Stripe order
- `POST /api/order/razorpay` - Place Razorpay order
- `POST /api/order/verifyStripe` - Verify Stripe payment
- `POST /api/order/verifyRazorpay` - Verify Razorpay payment
- `POST /api/order/userorders` - Get user orders
- `POST /api/order/cancel` - Cancel order (within 24 hours)
- `POST /api/order/list` - Get all orders (Admin)
- `POST /api/order/status` - Update order status (Admin)

## Key Features Implementation

### Payment Integration
- **Razorpay**: Complete integration with checkout modal and payment verification
- **Stripe**: Redirect-based payment with session handling
- **COD**: Direct order placement without payment gateway

### Order Cancellation
- Users can cancel orders within 24 hours of placement
- Automatic validation of cancellation eligibility
- Status updates reflected in both user and admin panels

### Authentication & Authorization
- JWT-based authentication
- Protected routes with auth guards
- Separate admin authentication

### State Management
- Angular Signals for reactive state
- Computed signals for cart calculations
- LocalStorage persistence

## Environment Variables

### Backend (.env)
All sensitive credentials should be stored in `.env` file (not committed to git)

### Frontend
Razorpay public key stored in environment.ts

## Security Notes
- Never commit `.env` files
- Keep API keys and secrets secure
- Use environment variables for all sensitive data
- Implement proper CORS configuration
- Validate all user inputs

## Contributing
Contributions are welcome! Please feel free to submit a Pull Request.

## License
This project is open source and available under the MIT License.

## Authors
- [Khushal Rathod](https://github.com/KhushalRathod1207)

## Acknowledgments
- Original MERN stack tutorial by [GreatStack YouTube Channel](https://youtu.be/7E6um7NGmeE)
- Converted to Angular stack with enhanced features
