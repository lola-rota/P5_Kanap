const cartItems = document.getElementById('cart__items');
let productCatalog = [];

function getCartContent() {
    // Recupere le panier sous forme d'array pour pouvoir le modifier
    let cartLinea = localStorage.getItem("cart");
    return (JSON.parse(cartLinea));
}

function getProductById(productId) {
    fetch('http://localhost:3000/api/products')
    .then(function(res) {
        if (res.ok) {
            return res.json();
        }
    })
    .then(function(value) {
        for (let item of value) {
            if (item._id == productId) {
                return item;
            }
        };
    })
    .catch(function(error) {
        // Une erreur est survenue
    })
}

function displayCartItems(cart) {
    for (let item of cart) {
      console.log(item);
        let product = getProductById(item.id);
        cartItems.innerHTML +=`<article class="cart__item" data-id="${item.id}" data-color="${item.color}">
        <div class="cart__item__img">
          <img src="${product.imageUrl}" alt="${product.altTxt}">
        </div>
        <div class="cart__item__content">
          <div class="cart__item__content__description">
            <h2>${product.name}</h2>
            <p>${item.color}</p>
            <p>${product.price},00 €</p>
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
      </article>`
    }
}

if (localStorage.length > 0) {
    displayCartItems(getCartContent());
}