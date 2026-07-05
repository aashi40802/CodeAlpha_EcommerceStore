# 🛒 ShopZone - E-Commerce Store

A full-stack e-commerce web application built with Node.js, Express.js, MongoDB, and vanilla JavaScript.

**CodeAlpha Full Stack Development Internship — Task 1**

## ✨ Features

- **Product Listings** — Browse products with search, category filter, and sorting
- **Product Details** — View detailed product info with quantity selection
- **Shopping Cart** — Add/remove items, adjust quantities, persistent cart
- **User Authentication** — Register & login with JWT-based auth
- **Order Processing** — Checkout with shipping address, order confirmation
- **My Orders** — View order history with status tracking
- **Responsive Design** — Works on desktop, tablet, and mobile

## 🛠 Tech Stack

- **Frontend:** HTML, CSS, JavaScript
- **Backend:** Node.js, Express.js
- **Database:** MongoDB with Mongoose ODM
- **Authentication:** JWT (JSON Web Tokens) + bcrypt
- **Architecture:** RESTful API + MVC Pattern

## 📁 Project Structure

```
CodeAlpha_EcommerceStore/
├── server.js              # Express server entry point
├── config/
│   └── db.js              # MongoDB connection
├── models/
│   ├── User.js            # User schema (auth)
│   ├── Product.js         # Product schema
│   └── Order.js           # Order schema
├── routes/
│   ├── auth.js            # Register/Login endpoints
│   ├── products.js        # Product CRUD endpoints
│   └── orders.js          # Order endpoints
├── middleware/
│   └── auth.js            # JWT verification middleware
├── seeds/
│   └── seed.js            # Sample product data seeder
├── public/
│   ├── index.html         # Homepage (product listing)
│   ├── product.html       # Product detail page
│   ├── cart.html           # Shopping cart + checkout
│   ├── login.html         # Login page
│   ├── register.html      # Registration page
│   ├── orders.html        # Order history page
│   ├── css/style.css      # Styles
│   └── js/
│       ├── auth.js        # Auth state management
│       ├── cart.js         # Cart (localStorage)
│       ├── main.js        # Product listing logic
│       ├── product.js     # Product detail logic
│       ├── checkout.js    # Cart page + checkout
│       └── orders.js      # Orders page logic
└── package.json
```

## 🚀 Setup & Installation

### Prerequisites
- [Node.js](https://nodejs.org/) (v16 or higher)
- [MongoDB](https://www.mongodb.com/try/download/community) (local) OR [MongoDB Atlas](https://www.mongodb.com/atlas) (cloud)

### Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/YOUR_USERNAME/CodeAlpha_EcommerceStore.git
   cd CodeAlpha_EcommerceStore
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   Create a `.env` file (already included as template):
   ```
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/shopzone
   JWT_SECRET=your_secret_key_here
   ```

4. **Start MongoDB** (if running locally)
   ```bash
   mongod
   ```

5. **Seed the database** (add sample products)
   ```bash
   npm run seed
   ```

6. **Start the server**
   ```bash
   npm run dev
   ```

7. **Open in browser**
   ```
   http://localhost:5000
   ```

## 📡 API Endpoints

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/api/auth/register` | Register new user | No |
| POST | `/api/auth/login` | Login user | No |
| GET | `/api/auth/me` | Get current user | Yes |
| GET | `/api/products` | Get all products | No |
| GET | `/api/products/:id` | Get single product | No |
| POST | `/api/orders` | Create new order | Yes |
| GET | `/api/orders/my-orders` | Get user's orders | Yes |

## 📸 Screenshots

*Add screenshots of your running application here*

## 👨‍💻 Author

**Your Name** — CodeAlpha Full Stack Development Intern

## 📄 License

This project is built for educational purposes as part of the CodeAlpha Internship Program.
