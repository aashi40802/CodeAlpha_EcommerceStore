// ===== CART PAGE & CHECKOUT =====

const cartItemsDiv = document.getElementById('cartItems');
const cartSummary = document.getElementById('cartSummary');
const emptyCart = document.getElementById('emptyCart');
const checkoutBtn = document.getElementById('checkoutBtn');
const checkoutModal = document.getElementById('checkoutModal');
const closeModal = document.getElementById('closeModal');
const placeOrderBtn = document.getElementById('placeOrderBtn');

function renderCart() {
  const cart = getCart();

  if (cart.length === 0) {
    cartItemsDiv.style.display = 'none';
    cartSummary.style.display = 'none';
    emptyCart.style.display = 'block';
    return;
  }

  emptyCart.style.display = 'none';
  cartSummary.style.display = 'block';
  cartItemsDiv.style.display = 'block';
  cartItemsDiv.innerHTML = '';

  cart.forEach(item => {
    const div = document.createElement('div');
    div.className = 'cart-item';
    div.innerHTML = `
      <img src="${item.image}" alt="${item.name}"
           onerror="this.src='https://via.placeholder.com/120x100?text=Product'">
      <div class="cart-item-info">
        <h3>${item.name}</h3>
        <p class="price">₹${item.price.toLocaleString()}</p>
        <div class="cart-item-actions">
          <div class="qty-controls">
            <button class="qty-btn minus-btn" data-id="${item.id}">−</button>
            <span class="qty-value">${item.quantity}</span>
            <button class="qty-btn plus-btn" data-id="${item.id}">+</button>
          </div>
          <span style="color:var(--gray);">Subtotal: ₹${(item.price * item.quantity).toLocaleString()}</span>
          <button class="remove-btn" data-id="${item.id}">
            <i class="fas fa-trash"></i> Remove
          </button>
        </div>
      </div>
    `;
    cartItemsDiv.appendChild(div);
  });

  // Quantity buttons
  document.querySelectorAll('.minus-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const cart = getCart();
      const item = cart.find(i => i.id === btn.dataset.id);
      if (item && item.quantity > 1) {
        updateCartQuantity(btn.dataset.id, item.quantity - 1);
        renderCart();
      }
    });
  });

  document.querySelectorAll('.plus-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const cart = getCart();
      const item = cart.find(i => i.id === btn.dataset.id);
      if (item) {
        updateCartQuantity(btn.dataset.id, item.quantity + 1);
        renderCart();
      }
    });
  });

  // Remove buttons
  document.querySelectorAll('.remove-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      removeFromCart(btn.dataset.id);
      showToast('Item removed from cart', 'info');
      renderCart();
    });
  });

  // Update summary
  const total = getCartTotal();
  const itemCount = getCartItemCount();
  document.getElementById('summaryCount').textContent = itemCount;
  document.getElementById('summarySubtotal').textContent = total.toLocaleString();
  document.getElementById('summaryTotal').textContent = total.toLocaleString();
}

// Checkout button
checkoutBtn.addEventListener('click', () => {
  if (!isLoggedIn()) {
    showToast('Please login to checkout', 'error');
    setTimeout(() => window.location.href = '/login.html', 1500);
    return;
  }
  document.getElementById('modalTotal').textContent = getCartTotal().toLocaleString();
  checkoutModal.style.display = 'flex';
});

// Close modal
closeModal.addEventListener('click', () => {
  checkoutModal.style.display = 'none';
});

checkoutModal.addEventListener('click', (e) => {
  if (e.target === checkoutModal) {
    checkoutModal.style.display = 'none';
  }
});

// Place order
placeOrderBtn.addEventListener('click', async () => {
  const fullName = document.getElementById('shipName').value.trim();
  const address = document.getElementById('shipAddress').value.trim();
  const city = document.getElementById('shipCity').value.trim();
  const postalCode = document.getElementById('shipPostal').value.trim();
  const phone = document.getElementById('shipPhone').value.trim();

  if (!fullName || !address || !city || !postalCode || !phone) {
    showToast('Please fill in all shipping details', 'error');
    return;
  }

  const cart = getCart();
  const orderData = {
    items: cart.map(item => ({
      productId: item.id,
      quantity: item.quantity
    })),
    shippingAddress: { fullName, address, city, postalCode, phone }
  };

  try {
    placeOrderBtn.disabled = true;
    placeOrderBtn.textContent = 'Placing order...';

    const res = await fetch('/api/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getToken()}`
      },
      body: JSON.stringify(orderData)
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || 'Failed to place order');
    }

    clearCart();
    checkoutModal.style.display = 'none';
    showToast('Order placed successfully! 🎉', 'success');

    // Show success state
    cartItemsDiv.innerHTML = `
      <div class="empty-cart">
        <i class="fas fa-check-circle" style="color:var(--success);"></i>
        <h2>Order Placed Successfully!</h2>
        <p>Your order ID: ${data._id}</p>
        <a href="/orders.html" class="btn btn-primary" style="margin-right:10px;">View Orders</a>
        <a href="/" class="btn btn-outline">Continue Shopping</a>
      </div>
    `;
    cartSummary.style.display = 'none';
  } catch (error) {
    showToast(error.message, 'error');
    placeOrderBtn.disabled = false;
    placeOrderBtn.innerHTML = '<i class="fas fa-check"></i> Place Order';
  }
});

document.addEventListener('DOMContentLoaded', renderCart);
