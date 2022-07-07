const pageTitle = document.getElementsByTagName('title')[0];
const productImage = document.getElementsByClassName('item__img')[0];
const productTitle = document.getElementById('title');
const productPrice = document.getElementById('price');
const productDescription = document.getElementById('description');
const productColors = document.getElementById('colors');
const productId = new URL(window.location.href).searchParams.get('id');
const productUrl = `http://localhost:3000/api/products/${productId}`;
const productQuantity = document.getElementById('quantity');
const addToCartButton = document.getElementById('addToCart');

function addProductColors(colors) {
    // Ajoute un par un tous les coloris d'un produit dans le champ de selection de coloris
    for (let color of colors) {
        productColors.innerHTML += `<option value="${color}">${color}</option>`;
    }
}

function addProductInfo(productJson) {
    // Incorpore dans le HTML de la page les differentes infos du produit
    pageTitle.innerText = productJson.name;
    productImage.innerHTML = `<img src="${productJson.imageUrl}" alt="${productJson.altTxt}">`;
    productTitle.innerText = productJson.name;
    productPrice.innerText = productJson.price;
    productDescription.innerText = productJson.description;
    addProductColors(productJson.colors);
}

fetch(productUrl)
.then(function(res) {
    if(res.ok) {
        return res.json();
    }
})
.then(function(value) {
    addProductInfo(value);
})
.catch(function(error) {
    // Une erreur est survenue
})

function getCartContent() {
    // Recupere le panier sous forme d'array pour pouvoir le modifier
    let cartLinea = localStorage.getItem("cart");
    return (JSON.parse(cartLinea));
}

function setCartContent(cart) {
    let cartLinea = JSON.stringify(cart);
    localStorage.setItem("cart", cartLinea);
}

function addProductToCart(product, cart) {
    let isInCart = false;
    for (let item of cart) {
        // Verifie si le panier contient deja un produit avec ID et coloris identiques
        if (item.id === product.id && item.color === product.color) {
            isInCart = true;
            item.quantity = parseInt(item.quantity) + parseInt(product.quantity);
        }
    }
    if (isInCart == false) {
        cart.push(product);
    }
    return cart;
}

addToCartButton.addEventListener('click', function() {
    let product = {
        id: productId,
        quantity: productQuantity.value,
        color: productColors.value
    }
    if (localStorage.length == 0) {
        setCartContent([]);
    }
    let cartJson = addProductToCart(product, getCartContent());
    setCartContent(cartJson);
    console.log(localStorage);
})