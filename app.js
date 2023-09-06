let openShopping = document.querySelector(".shopping");
let closeShopping = document.querySelector(".closeShopping");
let list = document.querySelector(".list");
let listCard = document.querySelector(".listCard");
let body = document.querySelector("body");
let total = document.querySelector(".total");
let quantity = document.querySelector(".quantity");
let smartphones = document.querySelector(".smartphones");
let cat = "";
let laptops = document.querySelector(".laptops");
let fragrances = document.querySelector(".fragrances");

let products = [];
openShopping.addEventListener("click", () => {
  body.classList.add("active");
});
closeShopping.addEventListener("click", () => {
  body.classList.remove("active");
});
let TOTAL = 100;
const fetchProducts = (limit, page) => {
  let addition = "";
  if (limit != null && page != null) {
    const skip = limit * (page - 1);
    addition = `?limit=${limit}&skip=${skip}`;
  }
  fetch(`https://dummyjson.com/products/${addition}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Request failed with status " + response.status);
      }
      const contentType = response.headers.get("Content-Type");
      if (contentType && contentType.includes("application/json")) {
        return response.json();
      } else {
        throw new Error("Response is not JSON");
      }
    })
    .then((data) => {
      // console.log(data.products.map((e) => e.title));
      //   showProducts(data.products);
      products = data.products;
      TOTAL = data.total;
      console.log(products);
      initApp(data.products);
    })
    .catch((error) => {
      window.location.reload();
      console.log(error);
    });
};
// fetchProducts(20, 1);

let listCards = [];
function initApp() {
  products.forEach((value, key) => {
    const { title, price, description, thumbnail } = value;
    let newDiv = document.createElement("div");
    newDiv.classList.add("item");
    newDiv.innerHTML = `
            <img src="${thumbnail}">
            <h4 class="title">${title}</h4>
            <h6>${description}</h6>
            <div class="price">$${price.toLocaleString()}</div>
            <button onclick="addToCard(${key})">Add To Card</button>`;
    list.appendChild(newDiv);
  });
}

function addToCard(key) {
  if (listCards[key] == null) {
    // copy product form list to list card
    listCards[key] = JSON.parse(JSON.stringify(products[key]));
    listCards[key].quantity = 1;
  }
  reloadCard();
}
function reloadCard() {
  listCard.innerHTML = "";
  let count = 0;
  let totalPrice = 0;
  listCards.forEach((value, key) => {
    const { title, price, thumbnail } = value;

    totalPrice = totalPrice + value.price;
    count = count + value.quantity;
    if (value != null) {
      let newDiv = document.createElement("li");
      newDiv.innerHTML = `
                <div><img src="${thumbnail}"/></div>
                <div>${title}</div>
                <div>${price.toLocaleString()}</div>
                <div>
                    <button onclick="changeQuantity(${key}, ${
        value.quantity - 1
      })">-</button>
                    <div class="count">${value.quantity}</div>
                    <button onclick="changeQuantity(${key}, ${
        value.quantity + 1
      })">+</button>
                </div>
                <button onclick="deleteCard(${key})">Delete</button>`;
      listCard.appendChild(newDiv);
    }
  });
  total.innerText = totalPrice.toLocaleString();
  quantity.innerText = count;
}
function changeQuantity(key, quantity) {
  if (quantity == 0) {
    delete listCards[key];
  } else {
    listCards[key].quantity = quantity;
    listCards[key].price = quantity * products[key].price;
  }
  reloadCard();
}

function deleteCard(key) {
  delete listCards[key];
  reloadCard();
}

smartphones.addEventListener("click", () => {
  window.location.reload();

  console.log(cat);
  cat = "category/smartphones";
  fetchProducts(20, 1);
});
laptops.addEventListener("click", () => {
  //   window.location.reload();

  console.log(cat);
  cat = "category/laptops";
  //   fetch(`https://dummyjson.com/products/?limit=10&skip=10`)
  //     .then((response) => {
  //       if (!response.ok) {
  //         throw new Error("Request failed with status " + response.status);
  //       }
  //       const contentType = response.headers.get("Content-Type");
  //       if (contentType && contentType.includes("application/json")) {
  //         return response.json();
  //       } else {
  //         throw new Error("Response is not JSON");
  //       }
  //     })
  //     .then((data) => {
  //       // console.log(data.products.map((e) => e.title));
  //       //   showProducts(data.products);
  //       products = data.products;
  //       TOTAL = data.total;
  //       console.log(products);
  //       initApp(data.products);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
});
fragrances.addEventListener("click", () => {
  console.log(cat);
  //   window.location.reload();
  cat = "category/fragrances";
  fetchProducts(20, 3);
});

fetchProducts(20, 1);
