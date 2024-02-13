const categoryList = document.querySelector(".categories");
const productList = document.querySelector(".products");
const backetBtn = document.querySelector("#backet");
const closeBtn = document.querySelector("#closeBtn");
const modalContainer = document.querySelector(".modal-container");
const modalList = document.querySelector(".modal-list");
const deleteBtn = document.querySelector("#del");
const totalInfo = document.querySelector("#total-info");

// Olayları izleme
document.addEventListener("DOMContentLoaded", fetchCategories);
document.addEventListener("DOMContentLoaded", fetchProduct);
backetBtn.addEventListener("click", openPage);
closeBtn.addEventListener("click", closePage);
modalContainer.addEventListener("click", handleClick);

//Kattegorileri çekme
function fetchCategories() {
  // veriye istek atma
  fetch("https://api.escuelajs.co/api/v1/categories")
    // veriyi json a çevirme
    .then((res) => res.json())
    //işlenen veriyi ekrana basma
    .then((data) =>
      // datayı 4 e indir ve her birini ekrana basma

      data.slice(0, 5).forEach((item) => {
        // gelen her obje için div oluşturma
        const categoryDiv = document.createElement("div");
        // div e class ekleme
        categoryDiv.classList.add("category");
        //divin içeriğini değiştirme
        categoryDiv.innerHTML = `
        <img src="https://picsum.photos/640/640?r=1538" />
            <span>${item.name}</span>
            `;
        // oluşan divi html e gönderme
        categoryList.appendChild(categoryDiv);
      })
    );
}

//Ürünleri Çekme
function fetchProduct() {
  // veriye istek atma
  fetch(" https://api.escuelajs.co/api/v1/products")
    // veriyi json a çevirme
    .then((res) => res.json())
    //işlenen veriyi ekrana basma
    .then((data) =>
      // datayı 4 e indir ve her birini ekrana basma
      data.slice(0, 25).forEach((product) => {
        const productDiv = document.createElement("div");
        productDiv.classList.add("product");
        productDiv.innerHTML = `
        <img src="https:/picsum.photos/640/640?=r1538" />
            <p>${product.title}</p>
            <p>${product.category.name}</p>
            <div class="product-item">
              <p>${product.price}₺</p>
              <button onclick="addToBasket({id:'${product.id}',title:'${product.title}',price:'${product.price}',amount:'1'})">Sepete ekle</button>
            </div>
        `;
        productList.appendChild(productDiv);
      })
    );
}
// sepete ekleme işlemi
let basket = [];
let total = 0;

function addToBasket(item) {
  //sepette eğer bu elemandan varsa onu değişkene aktar
  const foundItem = basket.find((basketItem) => basketItem.id === item.id);
  if (foundItem) {
    // elemandan sepette varsa miktarını arttır
    foundItem.amount++;
  } else {
    //eğer elemandna sepette bulunmadıysa sepete ekle
    basket.push(item);
  }
}

function openPage() {
  modalContainer.classList.add("active");
  addList();
  totalInfo.innerText = total;
}

function closePage() {
  modalContainer.classList.remove("active");
  // eğer bunu yapmazsak fazladan eleman tekrarı yapıyor ve listeliyor bunun amacı sepeti temizleme
  modalList.innerHTML = "";
  total = 0;
}

function addList() {
  basket.forEach((BasketItem) => {
    const listItem = document.createElement("div");
    listItem.classList.add("list-item");
    listItem.innerHTML = `
<img src="https:/picsum.photos/640/640?=r1538" alt="" />
<h2>${BasketItem.title}</h2>
<h2>${BasketItem.price}₺</h2>
<p>Miktar:${BasketItem.amount}</p>
<button id="del" onclick="handleDelete({id:'${BasketItem.id}', price:'${BasketItem.price}',amount:'${BasketItem.amount}'})">Sil</button>
`;
    modalList.appendChild(listItem);
    // toplam değişkeninin değerini değiştirme

    total += BasketItem.price * BasketItem.amount;
  });
}

// eğer dışarıya tıklanırsa kapatma
function handleClick(e) {
  if (e.target.classList.contains("modal-container")) {
    modalContainer.classList.remove("active");
    // eğer bunu yapmazsak fazladan eleman tekrarı yapıyor ve listeliyor bunun amacı sepeti temizleme
    modalList.innerHTML = "";
    total = 0;
  }
}

function handleDelete(deleteingItem) {
  basket = basket.filter((i) => i.id !== deleteingItem.id);
  total -= deleteingItem.price * deleteingItem.amount;
  totalInfo.innerText = total;
}

modalList.addEventListener("click", (e) => {
  if (e.target.id === "del") {
    e.target.parentElement.remove();
    console.log(basket);
  }
});
