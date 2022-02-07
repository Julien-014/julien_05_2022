//Rechercher une valeur dans un querystring
//Renvoie la 1ère valeur associée au paramètre de recherche
//Puis récuperer l'id du produit
const queryString = window.location.search
const urlParams = new URLSearchParams(queryString)
const id = urlParams.get("id")
//Pour que ces items soient accessibles et que leurs portée ne soit pas limitée
if (id != null) {
    let priceProduct = 0
    let imgUrl, altText, itemName
}

//Récuperer les id des produits grâce a l'API Fetch et les passer à la fonction takeData
fetch(`http://localhost:3000/api/products/${id}`)
    .then(response => response.json())
    .then(res => takeData(res))

//Récupérer les données obtenue par l'API 
//Les associer aux éléments donnés
//On ajoute les fonctions ayant besoin des données pour se remplir
//Ces fonctions vont récupérer les données dont elles ont besoin
function takeData(sofa) {

    const altTxt = sofa.altTxt
    const colors = sofa.colors
    const description = sofa.description
    const imageUrl = sofa.imageUrl
    const name = sofa.name
    const price = sofa.price
    imgUrl = imageUrl
    altText = altTxt
    itemName = name
    addImage(imageUrl, altTxt)
    addTitle(name)
    addPrice(price)
    addDescription(description)
    addColors(colors)

}

//Créer une image, ajouter sa source et son altxt grâce aux données récupérer
//Cela s'ajoute dans le HTML
//récupérer la classe item_img
//Puis placer l'img dans cette classe
function addImage(imageUrl, altTxt) {
    const image = document.createElement("img")
    image.src = imageUrl
    image.alt = altTxt
    const parent = document.querySelector(".item__img")
    if (parent != null) parent.appendChild(image)
}

//Ajouter un objet nom qui sera le nom du produit
//Cela s'ajoute dans le HTML
function addTitle(name) {
    const h1 = document.querySelector("#title")
    if (h1 != null) h1.textContent = name
}

//Créer un objet prix
//Cela s'ajoute dans le HTML
function addPrice(price) {
    const span = document.querySelector("#price")
    if (span != null) span.textContent = price
}

//Créer un objet description
//Cela s'ajoute dans le HTML
function addDescription(description) {
    const p = document.querySelector("#description")
    if (p != null) p.textContent = description
}

//Créer plus d'ub objet option value pour les choix de couleurs
//Les données des couleurs des produits sont prises grâce a la fonction takeData
//Ajouter le choix des couleurs aux produits
//Il y aura plusieurs choix de couleurs
//Cela s'ajoute dans le HTML
function addColors(colors) {
    const select = document.querySelector("#colors")
    if (select != null) {
        colors.forEach((color) => {
            const option = document.createElement("option")
            option.value = color
            option.textContent = color
            select.appendChild(option)
        })
    }
}

//Cela va vérifier que les options ont été remplis avant d'ajouter au panier
//Il faut sélectionner une couleur avant de pouvoir ajouter un produit au panier
//Il faut sélectionner au moins 1 en quantité avant de pouvoir ajouter un produit au panier
//On ne peut pas ajouter plus de 100 quantités avant de pouvoir ajouter au panier
//Si les critères sont remplis le produit voulu peut s'ajouter au panier
const button = document.querySelector("#addToCart")
if (button != null) {
    button.addEventListener("click", (e) => {
        const color = document.querySelector("#colors").value
        if (color === "") {
            alert("Veuillez choisir une couleur");
            return;
        }
        const quantity = document.querySelector("#quantity").value
        if (quantity == 0) {
            alert("Veuillez sélectionner au moins 1 article");
            return;
        }
        if (quantity > 100) {
            alert("Vous ne pouvez pas sélectionner plus de 100 articles");
            return;
        }
        saveCart(color, quantity)
    })
}



//Fonction qui va sauvegarder le produit et les options sélectionnés
//Cela va sotcker les données dans le LocalStorage
//Et ajouter cela au panier qui reçevra les données du localstorage
function saveCart(color, quantity) {
    const key = `${id}-${color}`
    const data = {
        id: id,
        color: color,
        quantity: Number(quantity),
        imageUrl: imgUrl,
        altTxt: altText,
        name: itemName
    }
    localStorage.setItem(key, JSON.stringify(data))
}


