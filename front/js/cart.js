const cartItems = document.getElementById('cart__items');
const totalQuantityField = document.getElementById('totalQuantity');
const totalPriceField = document.getElementById('totalPrice');

function getCartContent() {
  // Récupère le panier sous forme d'array pour pouvoir s'en servir
  let cartLinea = localStorage.getItem("cart");
  return (JSON.parse(cartLinea));
}

function displayCartItems() {
  const cart = getCartContent();
  for (let item of cart) {
    fetch(`http://localhost:3000/api/products/${item.id}`)
      .then(function(res) {
        if (res.ok) {
          return res.json();
        }
      })
      .then(value => {
        cartItems.innerHTML += `<article class="cart__item" data-id="${item.id}" data-color="${item.color}">
        <div class="cart__item__img">
        <img src="${value.imageUrl}" alt="${value.altTxt}">
        </div>
        <div class="cart__item__content">
        <div class="cart__item__content__description">
        <h2>${value.name}</h2>
        <p>${item.color}</p>
        <p class="itemPrice">${value.price},00 €</p>
        </div>
        <div class="cart__item__content__settings">
        <div class="cart__item__content__settings__quantity">
        <p>Qté : </p>
        <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${item.quantity}">
        </div>
        <div class="cart__item__content__settings__delete">
        <p class="deleteItem">Supprimer</p>
        </div>
        </div>
        </div>
        </article>`;
      })
      .catch(function(error) {
        // Une erreur est survenue
      });
  }
}

function displayTotal() {

  let totalQuantity = 0;
  let totalPrice = 0;
  const cart = getCartContent();

  for (let item of cart) {
    totalQuantity += parseInt(item.quantity);
    fetch(`http://localhost:3000/api/products/${item.id}`)
      .then(function(res) {
        if (res.ok) {
          return res.json();
        }
      })
      .then(value => {
        totalPrice += parseInt(item.quantity) * parseInt(value.price);
        return(totalPrice);
      })
      .then (value => {
        totalPriceField.innerText = value + ',00';
      })
      .catch(function(error) {
        // Une erreur est survenue
      });
    }
  totalQuantityField.innerText = totalQuantity;
}

displayCartItems();
displayTotal();