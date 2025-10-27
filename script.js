// ================================
// 🛍️  E-COMMERCE PRODUCT CATALOG JS
// ================================

// 📦 1. Product Data
const products = [
  { id: 1, name: "Wireless Headphones", category: "electronics", price: 999 },
  { id: 2, name: "Bluetooth Speaker", category: "electronics", price: 1299 },
  { id: 3, name: "Men's T-Shirt", category: "clothing", price: 499 },
  { id: 4, name: "Women's Dress", category: "clothing", price: 899 },
  { id: 5, name: "Sports Shoes", category: "footwear", price: 1499 },
  { id: 6, name: "Casual Slippers", category: "footwear", price: 399 },
  { id: 7, name: "Laptop Bag", category: "accessories", price: 699 },
  { id: 8, name: "Smart Watch", category: "electronics", price: 1999 },
];

// 🛒 2. Cart (load existing cart from Local Storage or start empty)
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// 🖼️ 3. Function to Display Products
function displayProducts(list) {
  const grid = document.getElementById("product-grid");
  grid.innerHTML = ""; // Clear existing content

  list.forEach(p => {
    const div = document.createElement("div");
    div.classList.add("product-card");
    div.innerHTML = `
      <h3>${p.name}</h3>
      <p>Category: ${p.category}</p>
      <p>Price: ₹${p.price}</p>
      <button onclick="addToCart(${p.id})">Add to Cart</button>
    `;
    grid.appendChild(div);
  });
}

// 💰 4. Add Product to Cart
function addToCart(id) {
  const product = products.find(p => p.id === id);
  if (!product) return;

  cart.push(product);
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
  alert(`${product.name} added to cart!`);
}

// 🧮 5. Update Cart Count
function updateCartCount() {
  document.getElementById("cart-count").textContent = cart.length;
}

// 🧾 6. Show Cart + Total Calculation
function showCart() {
  const cartContainer = document.getElementById("cart-container");
  const totalContainer = document.getElementById("total-price");

  cartContainer.innerHTML = "";
  if (cart.length === 0) {
    cartContainer.innerHTML = "<p>Your cart is empty!</p>";
    totalContainer.textContent = "";
    return;
  }

  let subtotal = 0;
  cart.forEach(item => {
    subtotal += item.price;
    const div = document.createElement("div");
    div.classList.add("cart-item");
    div.innerHTML = `
      <span>${item.name}</span>
      <span>₹${item.price}</span>
    `;
    cartContainer.appendChild(div);
  });

  const tax = subtotal * 0.18; // 18% tax
  const total = subtotal + tax;

  totalContainer.textContent = `Subtotal: ₹${subtotal} | Tax (18%): ₹${tax.toFixed(2)} | Total: ₹${total.toFixed(2)}`;
}

// 🎛️ 7. Filtering by Category
document.getElementById("category-filter").addEventListener("change", e => {
  const category = e.target.value;
  const filtered = category === "all" ? products : products.filter(p => p.category === category);
  displayProducts(filtered);
});

// 💵 8. Filtering by Price Range
document.getElementById("price-filter").addEventListener("input", e => {
  const priceLimit = parseInt(e.target.value);
  document.getElementById("price-value").textContent = `Up to ₹${priceLimit}`;
  const filtered = products.filter(p => p.price <= priceLimit);
  displayProducts(filtered);
});

// 🧹 9. Clear Cart
function clearCart() {
  if (confirm("Are you sure you want to clear the cart?")) {
    cart = [];
    localStorage.removeItem("cart");
    updateCartCount();
    showCart();
  }
}

// 🚀 10. Initialize Page
window.onload = () => {
  displayProducts(products);
  updateCartCount();
};
