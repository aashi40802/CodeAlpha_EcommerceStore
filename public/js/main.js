// ===== HOMEPAGE - PRODUCT LISTING =====

const productsGrid = document.getElementById('productsGrid');
const loading = document.getElementById('loading');
const noProducts = document.getElementById('noProducts');
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const categoryFilter = document.getElementById('categoryFilter');
const sortFilter = document.getElementById('sortFilter');

// Fetch and display products
async function loadProducts() {
  const search = searchInput ? searchInput.value.trim() : '';
  const category = categoryFilter ? categoryFilter.value : 'All';
  const sort = sortFilter ? sortFilter.value : 'newest';

  const params = new URLSearchParams();
  if (search) params.append('search', search);
  if (category !== 'All') params.append('category', category);
  if (sort) params.append('sort', sort);

  try {
    loading.style.display = 'block';
    productsGrid.innerHTML = '';
    noProducts.style.display = 'none';

    const res = await fetch(`/api/products?${params}`);
    const products = await res.json();

    loading.style.display = 'none';

    if (products.length === 0) {
      noProducts.style.display = 'block';
      return;
    }

    products.forEach(product => {
      const stars = renderStars(product.rating);
      const stockClass = product.stock > 0 ? 'in-stock' : 'out-of-stock';
      const stockText = product.stock > 0 ? `In Stock (${product.stock})` : 'Out of Stock';

      const card = document.createElement('div');
      card.className = 'product-card';
      card.innerHTML = `
        <img src="${product.image}" alt="${product.name}" 
             onerror="this.src='https://via.placeholder.com/400x300?text=Product'">
        <div class="product-info">
          <span class="product-category">${product.category}</span>
          <h3 class="product-name">${product.name}</h3>
          <div class="product-rating">
            ${stars} <span>${product.rating.toFixed(1)}</span>
          </div>
          <span class="stock-badge ${stockClass}">${stockText}</span>
          <div class="product-bottom">
            <span class="product-price">₹${product.price.toLocaleString()}</span>
            <button class="add-cart-btn" data-id="${product._id}" 
                    ${product.stock === 0 ? 'disabled style="opacity:0.5;cursor:not-allowed;"' : ''}>
              <i class="fas fa-cart-plus"></i> Add
            </button>
          </div>
        </div>
      `;

      // Click card to go to product detail
      card.addEventListener('click', (e) => {
        if (!e.target.closest('.add-cart-btn')) {
          window.location.href = `/product.html?id=${product._id}`;
        }
      });

      // Add to cart button
      const addBtn = card.querySelector('.add-cart-btn');
      if (product.stock > 0) {
        addBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          addToCart({
            id: product._id,
            name: product.name,
            price: product.price,
            image: product.image
          });
        });
      }

      productsGrid.appendChild(card);
    });
  } catch (error) {
    loading.style.display = 'none';
    noProducts.innerHTML = '<i class="fas fa-exclamation-triangle"></i><p>Error loading products. Please try again.</p>';
    noProducts.style.display = 'block';
    console.error('Error loading products:', error);
  }
}

function renderStars(rating) {
  let stars = '';
  for (let i = 1; i <= 5; i++) {
    if (i <= Math.floor(rating)) {
      stars += '<i class="fas fa-star"></i>';
    } else if (i - 0.5 <= rating) {
      stars += '<i class="fas fa-star-half-alt"></i>';
    } else {
      stars += '<i class="far fa-star"></i>';
    }
  }
  return stars;
}

// Event listeners
if (searchBtn) searchBtn.addEventListener('click', loadProducts);
if (searchInput) {
  searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') loadProducts();
  });
}
if (categoryFilter) categoryFilter.addEventListener('change', loadProducts);
if (sortFilter) sortFilter.addEventListener('change', loadProducts);

// Load products on page load
document.addEventListener('DOMContentLoaded', loadProducts);
