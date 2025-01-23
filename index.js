import { menuArray } from "./data.js";

const menuItem = document.querySelector(".menu");
const basketItems = document.querySelector(".basket-items");
const basketTotal = document.querySelector(".basket-total");

Array.prototype.remove = function (v) {
  if (this.indexOf(v) != -1) {
    this.splice(this.indexOf(v), 1);
    return true;
  }
  return false;
};

let selectedItems = [];

document.addEventListener("click", function (e) {
  if (e.target.className === "add-item") {
    selectedItems.push(menuArray[e.target.id]);
    document.querySelector("#order-title").style.display = "block";
  }

  if (e.target.className === "remove-btn") {
    selectedItems.remove(menuArray[e.target.id]);
    renderCart(selectedItems);
  } else {
    renderCart(selectedItems);
  }

  if (e.target.className === "payment-btn" && selectedItems.length > 0) {
    document.querySelector(".payment-form").style.display = "flex";
  }

  if (e.target.className === "form-items" && e.target.id === "submit-btn") {
    e.preventDefault();
    selectedItems = [];
    document.querySelector(".payment-form").style.display = "none";
    document.querySelector(".payment-btn").style.display = "none";
    document.querySelector("#order-title").style.display = "none";
    basketItems.innerHTML = `<h3 id="order-complete">Thank you for your order!</h3>`;
    basketTotal.innerHTML = "";
  }
});

// rendering the items to the page
function foodHTML(arr) {
  arr.map(function (item) {
    menuItem.innerHTML += `
    <div class="menu" id="${item.name}">
      <div class="item">
        <h1 class="emoji">${item.emoji}</h1>
        <div class="item-desc">
          <h3 class="food-type">${item.name}</h3>
          <h5 class="ingredients">${item.ingredients.join(", ")}</h5>
          <p class="price">£${item.price}</p>
        </div>
        <button class="add-item" id="${item.id}">+</button>
      </div>
    </div>
  `;
  });
}

foodHTML(menuArray);

function renderCart(arr) {
  document.querySelector(".payment-btn").style.display = "block";
  basketItems.innerHTML = "";

  if (arr.length > 0) {
    arr.forEach((item) => {
      basketItems.innerHTML += `
    <div class="added-item">

      <p class="item-name">
      ${item.name}
      <button class="remove-btn" id="${item.id}">remove</button>
      </p>

      <p class="item-price">£${item.price}</p>
    </div>
  `;
    });
  } else {
    basketItems.innerHTML = `<p id="cart">No items in the cart</p>`;
  }

  // add the total price together
  let totalPrice = 0;
  arr.map(function (item) {
    totalPrice += item.price;
  });
  // add the total price to the basket
  basketTotal.innerHTML = `
      <p id="total">Total:</p>
      <p id="total-price">£${totalPrice}</p>
  `;
}
