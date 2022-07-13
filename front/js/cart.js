const cartItems = document.getElementById('cart__items');
const totalQuantityField = document.getElementById('totalQuantity');
const totalPriceField = document.getElementById('totalPrice');

function getCartContent() {
  // Recupere le panier sous forme d'array pour pouvoir le modifier
  let cartLinea = localStorage.getItem("cart");
  return (JSON.parse(cartLinea));
}

function displayCartItems(cart) {
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

displayCartItems(getCartContent());

const itemQuantities = document.getElementsByClassName('itemQuantity');
const itemPrices = document.getElementsByClassName('itemPrice');

function displayTotal() {
  let totalQuantityNumber = 0;
  let totalPriceNumber = 0;
  for (let i = 0; i < itemQuantities.length; i++) {
    totalPriceNumber += parseInt(itemQuantities[i].value) * parseInt(itemPrices[i].split(',')[0]);
    totalQuantityNumber += parseInt(itemQuantities[i].value);
    console.log(totalPriceNumber);
  }
  totalPriceField.innerHTML = `${totalPriceNumber},00`;
  totalQuantityField.innerHTML = totalQuantityNumber;
}

displayTotal();