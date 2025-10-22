document.addEventListener("DOMContentLoaded", () => {
  const products = [
    { id: 1, name: "Product 1", price: 29.99 },
    { id: 2, name: "Product 2", price: 19.99 },
    { id: 3, name: "Product 3", price: 59.99 },
  ];

  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const productList = document.getElementById("product-list");
  const cartItems = document.getElementById("cart-items");
  const emptyCartMessage = document.getElementById("empty-cart");
  const cartTotalMessage = document.getElementById("cart-total");
  const totalPriceDisplay = document.getElementById("total-price");
  const checkOutBtn = document.getElementById("checkout-btn");

  products.forEach((product) => {
    const productDiv = document.createElement("div");
    productDiv.classList.add("product");
    productDiv.innerHTML = `
        <span>${product.name} - $${product.price}</span>
        <button data-id="${product.id}">Add to cart</button>
        `;

    productList.appendChild(productDiv);
  });

  if(cart.length > 0){
    renderCart()
  }

  productList.addEventListener("click", (event) => {
    if (event.target.tagName === "BUTTON") {
      const productId = parseInt(event.target.getAttribute("data-id"));
      const product = products.find((product) => productId === product.id);
      console.log(product);
      addToCart(product);
    }
  });

  function addToCart(product) {
    cart.push(product);
    saveCart();
    console.log(cart);
    renderCart();
  }

  function renderCart() {
    cartItems.innerHTML = "";
    let totalPrice = 0;

    if (cart.length > 0) {
      emptyCartMessage.classList.add("hidden");
      cartTotalMessage.classList.remove("hidden");
      cart.forEach((item, index) => {
        totalPrice += item.price;
        const div = document.createElement("div");
        div.innerHTML = `
        <span>${item.name} - $${item.price}</span>
        <button data-id="${item.id}">Remove</button>
        `;
        cartItems.appendChild(div);
      });
      totalPriceDisplay.textContent = `$${totalPrice.toFixed(2)}`;
    } else {
      emptyCartMessage.classList.remove("hidden");
      totalPriceDisplay.textContent = `$0.00`;
    }
  }

  cartItems.addEventListener("click", (event) => {
    if (event.target.tagName === "BUTTON") {
      event.stopPropagation();
      const id = parseInt(event.target.getAttribute("data-id"));
      cart = cart.filter((item) => {
        return item.id !== id;
      });
      saveCart();
      console.log(cart);
      renderCart();
    }
  });

  checkOutBtn.addEventListener("click", () => {
    cart.length = 0;
    alert(`checkout successful`);
    renderCart();
  });

  function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
  }
});
