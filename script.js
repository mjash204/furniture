/* =======================================
   LuxeHome - JavaScript Functionality
   Author: WebFused
   ======================================= */

/* ---------- PRELOADER ---------- */
window.addEventListener('load', () => {
    document.querySelector('.preloader').style.display = 'none';
});

/* ---------- DARK/LIGHT MODE ---------- */
const themeToggle = document.getElementById('themeToggle');
themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
});

/* ---------- MOBILE MENU ---------- */
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

hamburger.addEventListener('click', () => {
    mobileMenu.classList.toggle('active');
});

/* ---------- CART SIDEBAR ---------- */
const cartToggle = document.getElementById('cartToggle');
const cartSidebar = document.getElementById('cartSidebar');
const closeCart = document.getElementById('closeCart');

cartToggle.addEventListener('click', () => {
    cartSidebar.classList.add('active');
});

closeCart.addEventListener('click', () => {
    cartSidebar.classList.remove('active');
});

/* ---------- CART & WISHLIST COUNTERS ---------- */
let cartCount = 0;
let wishlistCount = 0;

function addToCart(product) {
    cartCount++;
    document.getElementById('cartCount').textContent = cartCount;

    const cartItems = document.getElementById('cartItems');
    const newItem = document.createElement('div');
    newItem.className = 'cart-item';
    newItem.innerHTML = `
        <p>${product.name}</p>
        <span>₹${product.price}</span>
    `;
    cartItems.appendChild(newItem);
}

function addToWishlist(product) {
    wishlistCount++;
    document.getElementById('wishlistCount').textContent = wishlistCount;
}

/* ---------- HERO 3D TILT EFFECT ---------- */
const heroContainer = document.querySelector('.product-3d-container');
if (heroContainer) {
    heroContainer.addEventListener('mousemove', (e) => {
        const width = heroContainer.offsetWidth;
        const height = heroContainer.offsetHeight;
        const x = e.offsetX;
        const y = e.offsetY;

        const rotateY = ((x / width) - 0.5) * 30;
        const rotateX = ((y / height) - 0.5) * -30;

        heroContainer.style.transform = `rotateY(${rotateY}deg) rotateX(${rotateX}deg) scale(1.05)`;
    });

    heroContainer.addEventListener('mouseleave', () => {
        heroContainer.style.transform = 'rotateY(0deg) rotateX(0deg) scale(1)';
    });
}

/* ---------- SEARCH SUGGESTIONS ---------- */
const searchInput = document.getElementById('searchInput');
const suggestionsBox = document.querySelector('.search-suggestions');

const dummyProducts = [
    'Modern Sofa', 'Dining Table', 'Office Chair', 'Bed', 'Wardrobe', 'Coffee Table',
    'Bookshelf', 'Accent Chair', 'TV Stand', 'Dresser'
];

searchInput.addEventListener('input', () => {
    const query = searchInput.value.toLowerCase();
    suggestionsBox.innerHTML = '';
    if (query) {
        const filtered = dummyProducts.filter(item => item.toLowerCase().includes(query));
        filtered.forEach(item => {
            const div = document.createElement('div');
            div.className = 'suggestion';
            div.textContent = item;
            div.addEventListener('click', () => {
                searchInput.value = item;
                suggestionsBox.innerHTML = '';
            });
            suggestionsBox.appendChild(div);
        });
    }
});

/* ---------- DYNAMIC PRODUCTS (NEW ARRIVALS & BEST SELLERS) ---------- */
const newArrivals = [
    {name: 'Modern Sofa', price: 35000, img:'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400'},
    {name: 'Wooden Dining Table', price: 22000, img:'https://images.unsplash.com/photo-1617806118233-18e1de247200?w=400'},
    {name: 'Office Chair', price: 8000, img:'https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=400'}
];

const bestSellers = [
    {name: 'Luxury Bed', price: 45000, img:'https://images.unsplash.com/photo-1540574163026-643ea20ade25?w=400'},
    {name: 'Leather Sofa', price: 38000, img:'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400'},
    {name: 'Coffee Table', price: 7000, img:'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400'}
];

function loadProducts(products, containerId) {
    const container = document.getElementById(containerId);
    container.innerHTML = '';
    products.forEach(product => {
        const div = document.createElement('div');
        div.className = 'product-card';
        div.innerHTML = `
            <img src="${product.img}" alt="${product.name}">
            <div class="product-info">
                <h4>${product.name}</h4>
                <p>₹${product.price}</p>
                <button class="btn btn-primary" onclick='addToCart(${JSON.stringify(product)})'>Add to Cart</button>
                <button class="btn btn-outline" onclick='addToWishlist(${JSON.stringify(product)})'>Wishlist</button>
            </div>
        `;
        container.appendChild(div);
    });
}

loadProducts(newArrivals, 'newArrivals');
loadProducts(bestSellers, 'bestSellers');

/* ---------- NEWSLETTER SUBMIT ---------- */
const newsletterForm = document.getElementById('newsletterForm');
newsletterForm.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Thank you for subscribing!');
    newsletterForm.reset();
});
