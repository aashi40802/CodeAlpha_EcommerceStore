// ===== MY ORDERS PAGE =====

const ordersList = document.getElementById('ordersList');
const loading = document.getElementById('loading');
const noOrders = document.getElementById('noOrders');

async function loadOrders() {
  if (!isLoggedIn()) {
    window.location.href = '/login.html';
    return;
  }

  try {
    const res = await fetch('/api/orders/my-orders', {
      headers: {
        'Authorization': `Bearer ${getToken()}`
      }
    });

    const orders = await res.json();
    loading.style.display = 'none';

    if (!Array.isArray(orders) || orders.length === 0) {
      noOrders.style.display = 'block';
      return;
    }

    orders.forEach(order => {
      const date = new Date(order.createdAt).toLocaleDateString('en-IN', {
        year: 'numeric', month: 'long', day: 'numeric'
      });

      const statusClass = `status-${order.status.toLowerCase()}`;

      const card = document.createElement('div');
      card.className = 'order-card';
      card.innerHTML = `
        <div class="order-header">
          <span class="order-id">Order #${order._id.slice(-8).toUpperCase()}</span>
          <span class="order-date">${date}</span>
          <span class="order-status ${statusClass}">${order.status}</span>
        </div>
        <div class="order-items">
          ${order.items.map(item => `
            <div class="order-item">
              <span>${item.name} × ${item.quantity}</span>
              <span>₹${(item.price * item.quantity).toLocaleString()}</span>
            </div>
          `).join('')}
        </div>
        <div class="order-footer">
          Total: ₹${order.totalAmount.toLocaleString()}
        </div>
      `;
      ordersList.appendChild(card);
    });
  } catch (error) {
    loading.innerHTML = '<p>Error loading orders. Please try again.</p>';
    console.error('Error:', error);
  }
}

document.addEventListener('DOMContentLoaded', loadOrders);
