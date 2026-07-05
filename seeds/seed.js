const mongoose = require('mongoose');
require('dotenv').config();
const Product = require('../models/Product');

const products = [
  {
    name: 'AirPods Pro (2nd Gen)',
    description: 'Active Noise Cancellation, Adaptive Transparency, and Personalized Spatial Audio. Up to 6 hours of listening time with ANC enabled. MagSafe charging case with built-in speaker and lanyard loop.',
    price: 24900,
    image: 'https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?w=500&h=400&fit=crop',
    category: 'Electronics',
    stock: 20,
    rating: 4.8
  },
  {
    name: 'Ultra HD Smart Watch',
    description: 'Premium smartwatch with always-on Retina display, blood oxygen sensor, ECG app, heart rate monitoring, sleep tracking, and GPS. Water resistant to 50 meters with 36-hour battery life.',
    price: 44900,
    image: 'https://images.unsplash.com/photo-1546868871-af0de0ae72be?w=500&h=400&fit=crop',
    category: 'Electronics',
    stock: 12,
    rating: 4.7
  },
  {
    name: 'Portable Bluetooth Speaker',
    description: 'Immersive 360-degree sound in a compact design. IP67 waterproof and dustproof rating. 20 hours of playtime with USB-C fast charging. Perfect for outdoor adventures.',
    price: 12990,
    image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500&h=400&fit=crop',
    category: 'Electronics',
    stock: 28,
    rating: 4.4
  },
  {
    name: 'Premium Leather Jacket',
    description: 'Handcrafted genuine leather jacket with satin lining. Features YKK zippers, adjustable waist belt, and two interior pockets. Timeless design that gets better with age.',
    price: 8999,
    image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500&h=400&fit=crop',
    category: 'Clothing',
    stock: 10,
    rating: 4.6
  },
  {
    name: 'Running Shoes Air Max',
    description: 'Engineered mesh upper for breathability. Responsive foam cushioning absorbs impact. Rubber outsole with flex grooves for natural movement. Ideal for daily runs and training.',
    price: 7499,
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&h=400&fit=crop',
    category: 'Sports',
    stock: 22,
    rating: 4.5
  },
  {
    name: 'Minimalist Leather Wallet',
    description: 'Slim bifold wallet crafted from full-grain leather. RFID blocking technology protects your cards. Holds up to 8 cards with a bill compartment. Comes in a premium gift box.',
    price: 1999,
    image: 'https://images.unsplash.com/photo-1627123424574-724758594e93?w=500&h=400&fit=crop',
    category: 'Accessories',
    stock: 35,
    rating: 4.3
  },
  {
    name: 'Clean Code by Robert C. Martin',
    description: 'A handbook of agile software craftsmanship. Learn to write code that is clean, readable, and maintainable. Essential reading for every developer who wants to level up their skills.',
    price: 499,
    image: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?w=500&h=400&fit=crop',
    category: 'Books',
    stock: 50,
    rating: 4.9
  },
  {
    name: 'Ceramic Pour Over Coffee Set',
    description: 'Hand-thrown ceramic dripper with matching server and two cups. Produces a clean, flavorful cup every time. Includes reusable stainless steel filter. Dishwasher safe.',
    price: 2499,
    image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=500&h=400&fit=crop',
    category: 'Home & Kitchen',
    stock: 18,
    rating: 4.6
  },
  {
    name: 'Wireless Charging Station',
    description: '3-in-1 wireless charging pad for phone, earbuds, and watch. Qi-certified with up to 15W fast charging. Non-slip surface with LED indicator. Clean cable management.',
    price: 2999,
    image: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=500&h=400&fit=crop',
    category: 'Electronics',
    stock: 30,
    rating: 4.2
  },
  {
    name: 'Premium Yoga Mat',
    description: 'Extra thick 8mm eco-friendly TPE material. Non-slip texture on both sides for stability. Includes alignment lines for proper form. Comes with carrying strap and bag.',
    price: 2199,
    image: 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=500&h=400&fit=crop',
    category: 'Sports',
    stock: 25,
    rating: 4.5
  },
  {
    name: 'Oversized Cotton Hoodie',
    description: 'Premium heavyweight cotton hoodie with brushed fleece interior. Relaxed oversized fit, ribbed cuffs and hem, kangaroo pocket. Available in minimal earth tones.',
    price: 2499,
    image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=500&h=400&fit=crop',
    category: 'Clothing',
    stock: 40,
    rating: 4.4
  },
  {
    name: 'Aviator Sunglasses',
    description: 'Classic aviator frame with polarized UV400 lenses. Lightweight metal frame with adjustable nose pads. Includes hard case and microfiber cleaning cloth.',
    price: 1499,
    image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=500&h=400&fit=crop',
    category: 'Accessories',
    stock: 32,
    rating: 4.3
  }
];

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');
    await Product.deleteMany({});
    console.log('Cleared existing products');
    await Product.insertMany(products);
    console.log(`Seeded ${products.length} products successfully!`);
    process.exit(0);
  } catch (error) {
    console.error('Seeding error:', error.message);
    process.exit(1);
  }
};

seedDB();