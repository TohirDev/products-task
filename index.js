let productBtn;
let card = [];
let cartBtn = document.getElementById("cart-btn");
let cart = document.querySelector(".cart");
cartBtn.addEventListener("click", () => {
  cart.classList.toggle("swipe");
});
fetch("https://dummyjson.com/products")
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
    console.log(data.products.map((e) => e.title));
    showProducts(data.products);
  })
  .catch((error) => {
    console.log(error);
  });

const main = document.getElementById("main");

function showProducts(movies) {
  main.innerHTML = "";

  movies.forEach((product) => {
    const { title, price, description, images } = product;

    let productCard = document.createElement("div");
    productCard.classList.add("product");
    let productImg = document.createElement("img");
    productImg.classList.add("product-img");
    productImg.src = images.slice(-1);
    let productTitle = document.createElement("h3");
    productTitle.innerText = title;
    let productPrice = document.createElement("span");
    productPrice.innerText = price;
    let productDesc = document.createElement("h6");
    productDesc.innerText = description;
    productBtn = document.createElement("button");
    productBtn.innerText = "add to card";
    productBtn.addEventListener("click", () => card.push(product));
    productCard.appendChild(productImg);
    productCard.appendChild(productTitle);
    productCard.appendChild(productPrice);
    productCard.appendChild(productDesc);
    productCard.appendChild(productBtn);
    main.appendChild(productCard);
  });
}
