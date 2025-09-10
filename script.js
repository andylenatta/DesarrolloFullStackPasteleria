let cart = [];
const cartCount = document.getElementById("cart-count");
const cartItems = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");
const cartModal = document.getElementById("cart-modal");
const closeCart = document.getElementById("close-cart");
const cartBtn = document.getElementById("cart-btn");
const checkoutBtn = document.getElementById("checkout");

// Agregar producto al carrito
document.querySelectorAll(".add-to-cart").forEach(button => {
  button.addEventListener("click", () => {
    const name = button.dataset.name;
    const price = parseInt(button.dataset.price);

    cart.push({ name, price });
    updateCart();
  });
});

// Mostrar carrito
cartBtn.addEventListener("click", (e) => {
  e.preventDefault();
  cartModal.style.display = "flex";
});

// Cerrar carrito
closeCart.addEventListener("click", () => {
  cartModal.style.display = "none";
});

// Eliminar producto (ahora accesible globalmente)
window.removeItem = function(index) {
  cart.splice(index, 1);
  updateCart();
};

// Actualizar carrito
function updateCart() {
  cartItems.innerHTML = "";
  let total = 0;

  cart.forEach((item, index) => {
    let li = document.createElement("li");
    li.innerHTML = `${item.name} - $${item.price} CLP 
      <button class="remove-item" onclick="removeItem(${index})">X</button>`;
    cartItems.appendChild(li);
    total += item.price;
  });

  cartCount.textContent = cart.length;
  cartTotal.textContent = total;
}

// Finalizar compra → abre WhatsApp con el pedido
checkoutBtn.addEventListener("click", () => {
  if (cart.length === 0) {
    alert("Tu carrito está vacío.");
    return;
  }

  let message = "Hola, quiero realizar un pedido:\n\n";
  cart.forEach(item => {
    message += `• ${item.name} - $${item.price} CLP\n`;
  });
  message += `\nTotal: $${cart.reduce((sum, item) => sum + item.price, 0)} CLP`;

  // ⚠️ Cambia este número al tuyo en formato internacional (sin +, con código de país)
  let phone = "56912345678"; // Chile = 56 + número
  let url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;

  window.open(url, "_blank");
});

