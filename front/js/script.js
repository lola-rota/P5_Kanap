const productList = document.getElementById('items');

//Ajouter la carte d'un produit sur la page d'accueil
function addProductToList (product) {
    productList.innerHTML += '<a href="./product.html?id=' + product._id + '"><article><img src="' + product.imageUrl + '" alt="' + product.altTxt + '"><h3 class="productName">' + product.name + '</h3><p class="productDescription">' + product.description + '</p></article></a>';
}

// Recupere les donnees des produits dans l'API
fetch('http://localhost:3000/api/products')
    .then(function(res) {
        if (res.ok) {
            // Les transforme en objets javaScript
            return res.json();
        }
    })
    .then(function(value) {
        for (let product of value) {
            // Les ajoute un par un dans le HTML de la page d'accueil
            addProductToList(product);
        }
    })
    .catch(function(error) {
        //Une erreur est survenue
    })
