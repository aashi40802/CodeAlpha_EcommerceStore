const mongoose = require('mongoose');
require('dotenv').config();
const Product = require('../models/Product');

const products = [
  {
    name: 'Wireless Bluetooth Headphones',
    description: 'Premium noise-cancelling wireless headphones with 30-hour battery life. Features deep bass, comfortable ear cushions, and built-in microphone for calls.',
    price: 2999,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop',
    category: 'Electronics',
    stock: 25,
    rating: 4.5
  },
  {
    name: 'Smart Watch Pro',
    description: 'Feature-packed smartwatch with heart rate monitor, GPS tracking, sleep analysis, and 7-day battery life. Water resistant up to 50m.',
    price: 4999,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=300&fit=crop',
    category: 'Electronics',
    stock: 15,
    rating: 4.3
  },
  {
    name: 'Portable Bluetooth Speaker',
    description: 'Compact waterproof speaker with 360-degree sound. Perfect for outdoor adventures with 12-hour playtime.',
    price: 1499,
    image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=300&fit=crop',
    category: 'Electronics',
    stock: 30,
    rating: 4.2
  },
  {
    name: 'Classic Denim Jacket',
    description: 'Timeless denim jacket made from premium cotton. Features button closure, chest pockets, and a comfortable relaxed fit.',
    price: 1999,
    image: 'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=400&h=300&fit=crop',
    category: 'Clothing',
    stock: 20,
    rating: 4.4
  },
  {
    name: 'Running Shoes Ultra',
    description: 'Lightweight running shoes with responsive cushioning and breathable mesh upper. Ideal for daily training and long runs.',
    price: 3499,
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=300&fit=crop',
    category: 'Sports',
    stock: 18,
    rating: 4.6
  },
  {
    name: 'Leather Crossbody Bag',
    description: 'Elegant genuine leather crossbody bag with adjustable strap, multiple compartments, and secure zip closure.',
    price: 2499,
    image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400&h=300&fit=crop',
    category: 'Accessories',
    stock: 12,
    rating: 4.7
  },
  {
    name: 'JavaScript: The Good Parts',
    description: 'A deep dive into the best features of JavaScript. Essential reading for any web developer looking to write clean, efficient code.',
    price: 599,
    image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&h=300&fit=crop',
    category: 'Books',
    stock: 50,
    rating: 4.8
  },
  {
    name: 'Stainless Steel Water Bottle',
    description: 'Double-wall vacuum insulated bottle keeps drinks cold for 24 hours or hot for 12 hours. BPA-free, 750ml capacity.',
    price: 799,
    image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=400&h=300&fit=crop',
    category: 'Home & Kitchen',
    stock: 40,
    rating: 4.1
  },
  {
    name: 'Wireless Charging Pad',
    description: 'Fast wireless charger compatible with all Qi-enabled devices. Sleek design with LED indicator and anti-slip surface.',
    price: 899,
    image: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=300&fit=crop',
    category: 'Electronics',
    stock: 35,
    rating: 4.0
  },
  {
    name: 'Yoga Mat Premium',
    description: 'Extra thick 6mm yoga mat with non-slip surface. Eco-friendly TPE material, includes carrying strap. Perfect for yoga and pilates.',
    price: 1299,
    image: 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=400&h=300&fit=crop',
    category: 'Sports',
    stock: 22,
    rating: 4.5
  },
  {
    name: 'Cotton T-Shirt Pack (3)',
    description: 'Pack of 3 premium cotton t-shirts in black, white, and grey. Soft fabric, round neck, regular fit.',
    price: 999,
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=300&fit=crop',
    category: 'Clothing',
    stock: 45,
    rating: 4.3
  },
  {
    name: 'Ceramic Coffee Mug Set',
    description: 'Set of 4 handcrafted ceramic mugs in earthy tones. Microwave and dishwasher safe, 350ml capacity each.',
    price: 699,
    image: 'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=400&h=300&fit=crop',
    category: 'Home & Kitchen',
    stock: 28,
    rating: 4.4
  }
];

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing products
    await Product.deleteMany({});
    console.log('Cleared existing products');

    // Insert sample products
    await Product.insertMany(products);
    console.log(`Seeded ${products.length} products successfully!`);

    process.exit(0);
  } catch (error) {
    console.error('Seeding error:', error.message);
    process.exit(1);
  }
};

seedDB();
