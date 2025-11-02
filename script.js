const products = [
  { id: 1, name: "Smartphone", price: 29999, category: "electronics", image: "https://tse4.mm.bing.net/th/id/OIP.itwVqeFWhUrEhssBe4E_uQHaEK?pid=Api&P=0&h=180" },
  { id: 2, name: "Headphones", price: 1999, category: "electronics", image: "https://tse2.mm.bing.net/th/id/OIP.rAMTGHyyjcQYqHvxFXmeqQHaHa?pid=Api&P=0&h=180" },
  { id: 3, name: "T-Shirt", price: 499, category: "clothing", image: "https://tse4.mm.bing.net/th/id/OIP.rYksZX8ffCYNZCBBoAbZnAHaHa?pid=Api&P=0&h=180" },
  { id: 4, name: "Novel Book", price: 299, category: "books", image: "https://tse2.mm.bing.net/th/id/OIP.9HMt8pR9bfPYi96K7AROKAHaJ4?pid=Api&P=0&h=180" },
  { id: 5, name: "Smartwatch", price: 4999, category: "electronics", image: "https://tse4.mm.bing.net/th/id/OIP.MgKq5Zcr_cUh-1K2kfx_QgHaFl?pid=Api&P=0&h=180" },
];

let cart = JSON.parse(localStorage.getItem("cart")) || [];

const grid = document.getElementById("productGrid");
const cartSection = document.getElementById("cartSection");
const cartItems = document.getElementById("cartItems");
const totalPriceEl = document.getElementById("totalPrice");
const cartCount = document.getElementById("cartCount");

// Display products
function displayProducts(filtered = products) {
  grid.innerHTML = filtered.map(p => `
    <div class="product">
      <img src="${p.image}" alt="${p.name}">
      <h3>${p.name}</h3>
      <p>₹${p.price}</p>
      <button onclick="addToCart(${p.id})">Add to Cart</button>
    </div>
  `).join("");
}

displayProducts();

// Add to cart
function addToCart(id) {
  const product = products.find(p => p.id === id);
  cart.push(product);
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCart();
}

// Update cart
function updateCart() {
  cartItems.innerHTML = cart.map(item => `<li>${item.name} - ₹${item.price}</li>`).join("");
  let total = cart.reduce((sum, item) => sum + item.price, 0);
  const tax = total * 0.18;
  totalPriceEl.innerText = `Total (incl. 18% tax): ₹${(total + tax).toFixed(2)}`;
  cartCount.innerText = cart.length;
}

// Filters
const categoryFilter = document.getElementById("categoryFilter");
const priceRange = document.getElementById("priceRange");
const priceValue = document.getElementById("priceValue");
const searchBar = document.getElementById("searchBar");

categoryFilter.addEventListener("change", applyFilters);
priceRange.addEventListener("input", () => {
  priceValue.innerText = `₹${priceRange.value}`;
  applyFilters();
});
searchBar.addEventListener("input", applyFilters);

function applyFilters() {
  const category = categoryFilter.value;
  const maxPrice = parseInt(priceRange.value);
  const search = searchBar.value.toLowerCase();

  const filtered = products.filter(p =>
    (category === "all" || p.category === category) &&
    p.price <= maxPrice &&
    p.name.toLowerCase().includes(search)
  );

  displayProducts(filtered);
}

// Cart toggle
document.getElementById("cartIcon").addEventListener("click", () => {
  cartSection.classList.toggle("hidden");
});

updateCart();

// Checkout
document.getElementById("checkoutBtn").addEventListener("click", () => {
  alert("Thank you for shopping with us!");
  cart = [];
  localStorage.removeItem("cart");
  updateCart();
});
