// ===== PRODUCT DETAIL PAGE =====

const productDetail = document.getElementById('productDetail');
const loading = document.getElementById('loading');

// Get product ID from URL
const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get('id');

let currentQuantity = 1;

async function loadProduct() {
  if (!productId) {
    window.location.href = '/';
    return;
  }

  try {
    const res = await fetch(`/api/products/${productId}`);
    if (!res.ok) throw new Error('Product not found');
    const product = await res.json();

    loading.style.display = 'none';
    document.title = `${product.name} - ShopZone`;

    const stars = renderStars(product.rating);
    const stockClass = product.stock > 0 ? 'in-stock' : 'out-of-stock';
    const stockText = product.stock > 0 ? `In Stock (${product.stock} available)` : 'Out of Stock';

    productDetail.innerHTML = `
      <div class="detail-image">
        <img src="${product.image}" alt="${product.name}"
             onerror="this.src='https://via.placeholder.com/400x300?text=Product'">
      </div>
      <div class="detail-info">
        <span class="product-category">${product.category}</span>
        <h1>${product.name}</h1>
        <div class="product-rating">
          ${stars} <span>(${product.rating.toFixed(1)} rating)</span>
        </div>
        <p class="detail-description">${product.description}</p>
        <div class="product-price detail-price">₹${product.price.toLocaleString()}</div>
        <span class="stock-badge ${stockClass}">${stockText}</span>
        ${product.stock > 0 ? `
          <div class="quantity-selector">
            <label>Quantity:</label>
            <div class="qty-controls">
              <button class="qty-btn" id="qtyMinus">−</button>
              <span class="qty-value" id="qtyValue">1</span>
              <button class="qty-btn" id="qtyPlus">+</button>
            </div>
          </div>
          <div class="detail-actions">
            <button class="btn btn-primary" id="addToCartBtn">
              <i class="fas fa-cart-plus"></i> Add to Cart
            </button>
            <button class="btn btn-outline" id="buyNowBtn">
              <i class="fas fa-bolt"></i> Buy Now
            </button>
          </div>
        ` : `
          <div class="detail-actions" style="margin-top:20px;">
            <button class="btn btn-primary" disabled style="opacity:0.5;cursor:not-allowed;">
              Out of Stock
            </button>
          </div>
        `}
      </div>
    `;

    // Quantity controls
    if (product.stock > 0) {
      document.getElementById('qtyMinus').addEventListener('click', () => {
        if (currentQuantity > 1) {
          currentQuantity--;
          document.getElementById('qtyValue').textContent = currentQuantity;
        }
      });

      document.getElementById('qtyPlus').addEventListener('click', () => {
        if (currentQuantity < product.stock) {
          currentQuantity++;
          document.getElementById('qtyValue').textContent = currentQuantity;
        }
      });

      document.getElementById('addToCartBtn').addEventListener('click', () => {
        addToCart({
          id: product._id,
          name: product.name,
          price: product.price,
          image: product.image
        }, currentQuantity);
      });

      document.getElementById('buyNowBtn').addEventListener('click', () => {
        addToCart({
          id: product._id,
          name: product.name,
          price: product.price,
          image: product.image
        }, currentQuantity);
        window.location.href = '/cart.html';
      });
    }
  } catch (error) {
    loading.innerHTML = '<p>Product not found. <a href="/">Go back to shop</a></p>';
    console.error('Error:', error);
  }
}

function renderStars(rating) {
  let stars = '';
  for (let i = 1; i <= 5; i++) {
    if (i <= Math.floor(rating)) stars += '<i class="fas fa-star" style="color:#fdcb6e;"></i>';
    else if (i - 0.5 <= rating) stars += '<i class="fas fa-star-half-alt" style="color:#fdcb6e;"></i>';
    else stars += '<i class="far fa-star" style="color:#fdcb6e;"></i>';
  }
  return stars;
}

document.addEventListener('DOMContentLoaded', loadProduct);
