// ===== AUTH STATE MANAGEMENT =====

function checkAuth() {
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user') || 'null');
  const authLinks = document.getElementById('authLinks');
  const userLinks = document.getElementById('userLinks');
  const userName = document.getElementById('userName');

  if (token && user) {
    if (authLinks) authLinks.style.display = 'none';
    if (userLinks) userLinks.style.display = 'flex';
    if (userName) userName.textContent = user.name;
  } else {
    if (authLinks) authLinks.style.display = 'flex';
    if (userLinks) userLinks.style.display = 'none';
  }
}

function logout() {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  showToast('Logged out successfully', 'info');
  setTimeout(() => window.location.href = '/', 500);
}

function getToken() {
  return localStorage.getItem('token');
}

function isLoggedIn() {
  return !!localStorage.getItem('token');
}

// Toast notification
function showToast(message, type = 'info') {
  const toast = document.getElementById('toast');
  if (!toast) return;
  toast.textContent = message;
  toast.className = `toast ${type} show`;
  setTimeout(() => {
    toast.classList.remove('show');
  }, 3000);
}

// Initialize auth on every page
document.addEventListener('DOMContentLoaded', () => {
  checkAuth();

  const logoutBtn = document.getElementById('logoutBtn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', logout);
  }
});
