// --- REMOVE FROM WISHLIST ---
document.querySelectorAll(".remove").forEach((button) => {
  button.addEventListener("click", () => {
    button.closest(".wishlist-item").remove();
    alert("Item removed from wishlist!");
  });
});

// --- ADD TO CART ---
document.querySelectorAll(".add-cart").forEach((button) => {
  button.addEventListener("click", () => {
    const item = button.closest(".wishlist-item");
    const name = item.querySelector("h3").textContent;
    const price = item.querySelector(".price").textContent;
    const img = item.querySelector("img").src;

    const product = { name, price, img };

    // get cart from localStorage
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.push(product);

    // save back to localStorage
    localStorage.setItem("cart", JSON.stringify(cart));

    alert(`${name} added to cart successfully!`);
  });
});
