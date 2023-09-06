let chosenProducts = [];
let productBtn;
let card = [];
let cartBtn = document.getElementById("cart-btn");
let cart = document.querySelector(".cart");
let allData = {};
let selectedProduct = {};
cartBtn.addEventListener("click", () => {
  cart.classList.toggle("swipe");
});
let TOTAL = 100;
const fetchProducts = (limit, page) => {
  let addition = "";
  if (limit != null && page != null) {
    const skip = limit * (page - 1);
    addition = `?limit=${limit}&skip=${skip}`;
  }
  fetch(`https://dummyjson.com/products${addition}`)
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
      showProducts(data.products);
      allData = data.products;
      TOTAL = data.total;
    })
    .catch((error) => {
      console.log(error);
    });
};

const main = document.getElementById("main");
fetchProducts(20, 1);
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
    productBtn.addEventListener("click", () => {
      // card.push(product.id);
      // console.log(
      //   allData.reduce((acc, item) => {
      //     Object.assign(acc, { [item.id]: item });
      //     return acc;
      //   }, {})
      // );
      //   let cartProduct = document.createElement("div");
      //   cartProduct.classList.add("cart-product");
      //   let cartImg = document.createElement("img");
      //   cartImg.classList.add("cart-img");
      //   let cartTitle = document.createElement("h4");
      //   let cartPrice = document.createElement("p");
      //   cart.appendChild(cartProduct);
      //   cart.appendChild(cartImg);
      //   cart.appendChild(cartTitle);
      //   cart.appendChild(cartPrice);

      // console.log(card);
      // selectedProduct = product.id;

      // if (product.id in allData) {
      //   const buf = allData[product.id];
      //   buf.count += 1;
      //   buf.price = buf.count * buf.price;
      //   // console.log(buf);
      // } else {
      //   Object.assign(allData, {
      //     [product.id]: {
      //       product: product,
      //       count: 1,
      //       price: product.price,
      //     },
      //   });
      //   console.log(selectedProduct.count);
      // }
      console.log(chosenProducts);
    });
    productCard.appendChild(productImg);
    productCard.appendChild(productTitle);
    productCard.appendChild(productPrice);
    productCard.appendChild(productDesc);
    productCard.appendChild(productBtn);
    main.appendChild(productCard);
  });
}
const addToCart = (key) => {
  if (chosenProducts[key] === null) {
    chosenProducts[key] = JSON.parse(JSON.stringify(allData[key]));
    chosenProducts[key].quantity = 1;
  }
};

const displayCart = () => {};
//decrement product count

// if (sel.id in card) {
//   const buf = card[sel.id];
//   if (buf.count === 1) {
//     delete card[sel.id];
//     return;
//   }
//   buf.count -= 1;
// }
// //increment product count

// if (sel.id in card) {
//   const buf = card[sel.id];
//   if (buf.count < buf.product.stock) buf.count += 1;
// }
