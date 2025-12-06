function getCart() {
  const stored = localStorage.getItem('glowjoyCart');
  return stored ? JSON.parse(stored) : [];
}

function saveCart(cart) {
  localStorage.setItem('glowjoyCart', JSON.stringify(cart));
  updateCartCount();
}

function addToCart(name, price) {
  const cart = getCart();
  cart.push({ name, price });
  saveCart(cart);
  alert(name + " added to cart!");
}

function quickAdd(name) {
  addToCart(name, 4.99);
}

function updateCartCount() {
  const cart = getCart();
  const count = cart.length;
  const span = document.getElementById('nav-cart-count');
  if (span) span.textContent = count;
}

function loadCheckout() {
  const cart = getCart();
  const list = document.getElementById('cart-items-list');
  const totalEl = document.getElementById('cart-total');
  if (!list || !totalEl) return;

  list.innerHTML = '';
  let total = 0;
  cart.forEach((item, index) => {
    const li = document.createElement('li');
    li.textContent = (index + 1) + '. ' + item.name + ' – $' + item.price.toFixed(2);
    list.appendChild(li);
    total += item.price;
  });
  totalEl.textContent = total.toFixed(2);
}

function setupCheckoutForm() {
  const form = document.getElementById('checkout-form');
  if (!form) return;
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    const msg = document.getElementById('order-message');
    if (msg) {
      msg.textContent = 'Order complete! (Demo only – no real payment processed.)';
    }
    saveCart([]);
  });
}

function setupAuthTabs() {
  const tabs = document.querySelectorAll('.auth-tab');
  const panels = document.querySelectorAll('.auth-panel');
  if (!tabs.length) return;

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const targetId = tab.getAttribute('data-tab');
      panels.forEach(panel => {
        panel.style.display = panel.id === targetId ? 'block' : 'none';
      });
    });
  });
}

function setupScrollAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
      }
    });
  }, { threshold: 0.15 });

  document.querySelectorAll('.fade-up, .pop-in').forEach(el => observer.observe(el));
}

function setupNavToggle() {
  const toggle = document.getElementById('navToggle');
  const nav = document.querySelector('.main-nav');
  if (!toggle || !nav) return;
  toggle.addEventListener('click', () => {
    nav.classList.toggle('open');
  });
}

document.addEventListener('DOMContentLoaded', () => {
  updateCartCount();
  loadCheckout();
  setupCheckoutForm();
  setupAuthTabs();
  setupScrollAnimations();
  setupNavToggle();
});