# FashionNow E-Commerce - Angular Frontend

Angular conversion of the FashionNow E-Commerce React application.

## 🚀 Quick Start

### Prerequisites
- Node.js (v18 or above)
- Angular CLI (v17+)
- Backend server running on port 4000

### Installation

1. **Install dependencies:**
```bash
npm install
```

2. **Install TailwindCSS (if not already installed):**
```bash
npm install -D tailwindcss postcss autoprefixer --legacy-peer-deps
```

### Configuration

**Environment Setup:**
- Development: `src/environments/environment.ts`
- Production: `src/environments/environment.prod.ts`

Update `backendUrl` to match your backend server:
```typescript
export const environment = {
  production: false,
  backendUrl: 'http://localhost:4000'
};
```

### Running the Application

**Development Server:**
```bash
ng serve
```
Navigate to `http://localhost:4200/`

**Build for Production:**
```bash
ng build
```

**Build with Production Environment:**
```bash
ng build --configuration production
```

## 📁 Project Structure

```
src/
├── app/
│   ├── components/          # Reusable components
│   │   ├── navbar/
│   │   ├── footer/
│   │   ├── search-bar/
│   │   ├── product-item/
│   │   ├── hero/
│   │   ├── latest-collection/
│   │   ├── best-seller/
│   │   ├── our-policy/
│   │   ├── newsletter/
│   │   ├── cart-total/
│   │   └── title/
│   ├── pages/               # Page components
│   │   ├── home/
│   │   ├── collection/
│   │   ├── about/
│   │   ├── contact/
│   │   ├── product/
│   │   ├── cart/
│   │   ├── login/
│   │   ├── place-order/
│   │   ├── orders/
│   │   └── verify/
│   ├── services/            # Services
│   │   └── shop.service.ts
│   ├── guards/              # Route guards
│   │   └── auth.guard.ts
│   ├── models/              # TypeScript interfaces
│   │   ├── product.model.ts
│   │   └── assets.ts
│   ├── app.routes.ts        # Routing configuration
│   └── app.config.ts        # App configuration
├── assets/                  # Static assets
│   └── frontend_assets/
├── environments/            # Environment configs
└── styles.css              # Global styles
```

## 🔑 Key Features

- ✅ Standalone Components (Angular 17+)
- ✅ Signals for reactive state management
- ✅ HttpClient for API calls
- ✅ Route guards for authentication
- ✅ TailwindCSS for styling
- ✅ Responsive design
- ✅ Shopping cart functionality
- ✅ User authentication
- ✅ Product filtering and sorting

## 🔄 React to Angular Conversion

### Key Differences:

| React | Angular |
|-------|---------|
| useState | signal() |
| useContext | Service with Injectable |
| useEffect | effect() / ngOnInit |
| axios | HttpClient |
| react-router-dom | @angular/router |
| Props | @Input() |

### State Management:
- React Context → Angular Service with Signals
- All state managed in `ShopService`

### Routing:
- Protected routes use `authGuard`
- All routes defined in `app.routes.ts`

## 🛠️ Backend Setup

Ensure backend is running:

```bash
cd ../backend
npm install
npm run server
```

**Backend .env file:**
```env
MONGODB_URI=your_mongodb_uri
CLOUDINARY_API_KEY=your_key
CLOUDINARY_SECRET_KEY=your_secret
CLOUDINARY_NAME=your_name
JWT_SECRET=your_secret
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=admin123
STRIPE_SECRET_KEY=your_stripe_key
```

## 📝 Available Scripts

- `ng serve` - Start development server
- `ng build` - Build for production
- `ng test` - Run unit tests
- `ng lint` - Lint the code

## 🌐 API Endpoints Used

- `GET /api/product/list` - Get all products
- `POST /api/user/register` - Register user
- `POST /api/user/login` - Login user
- `POST /api/cart/add` - Add to cart
- `POST /api/cart/update` - Update cart
- `POST /api/cart/get` - Get user cart

## 🎨 Styling

- **TailwindCSS** for utility-first styling
- **Google Fonts**: Outfit & Prata
- Responsive breakpoints: sm, md, lg

## 📦 Dependencies

- @angular/core: ^17+
- @angular/common: ^17+
- @angular/router: ^17+
- tailwindcss: ^3.4+

## 🔐 Authentication

- JWT token stored in localStorage
- Auth guard protects cart, orders, and checkout routes
- Token sent in headers for authenticated requests

## 🚧 Future Enhancements

- Complete Orders page implementation
- Payment gateway integration
- Product reviews and ratings
- Wishlist functionality
- Order tracking

## 📄 License

This project is for educational purposes.

## 👨‍💻 Author

Converted from React to Angular
Original React project by Sakthivel
