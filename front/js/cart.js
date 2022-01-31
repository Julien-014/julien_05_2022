// liste totale des objets dans un id
const cart = []

retrieveItems()
cart.forEach((item) => displayItem(item))

//En appuyant sur le bouton "commander" la commande
const orderButton = document.querySelector("#order")
orderButton.addEventListener("click", (e) => submitForm(e))


//On retourne le nombre d'item stocké dans le localStorage
//On récupère l'item du localStorage
//On le transforme en objet 
//dès qu'on a un objet on le pousse dans la bonne case
function retrieveItems() {
    const numberOfItems = localStorage.length 
    for (let i = 0; i < numberOfItems; i++) {
        const item = localStorage.getItem(localStorage.key(i))
        const itemObject = JSON.parse(item)
        cart.push(itemObject)
    }

}

// Fonction qui permet de créer chaque élément qui va etre dans l'item
function displayItem(item) {
    const article = addArticle(item)
    const imgDiv = addImageAndDiv(item)
    article.appendChild(imgDiv)

    const cartItemContent = addCartContent(item)
    article.appendChild(cartItemContent)
    displayArticle(article)

    displayTotalQuantity()
    displayTotalPrice()
}

//Fonction qui va calculer et afficher la quantité total d'objet dans le panier
//La quantité va se mettre à jour automatiquement qu'on ajoute ou supprime des items
function displayTotalQuantity() {
    const totalQuantity = document.querySelector("#totalQuantity")
    const total = cart.reduce((total, item) => total + item.quantity, 0)
    totalQuantity.textContent = total
}

//Fonction qui va calculer et afficher le prix total des objets dans le panier
//La fonction va multiplier le nombre d'article avec leur prix de base
//Le prix va se mettre à jour automatiquement qu'on ajoute ou supprime des items
function displayTotalPrice() {
    let total = 0
    const totalPrice = document.querySelector("#totalPrice")
    cart.forEach((item) => {
        const totalUnitPrice = item.price * item.quantity
        total += totalUnitPrice
    })
    totalPrice.textContent = total
}

//Créer la div "cart__item__content"
//Y ajouter la div Description et la Settings
//Ajouter le contenu de ces 2 fonctions
function addCartContent(item) {
    const cartItemContent = document.createElement("div")
    cartItemContent.classList.add("cart__item__content")

    const description = addDescription(item)
    const settings = addSettings(item)

    cartItemContent.appendChild(description)
    cartItemContent.appendChild(settings)

    return cartItemContent
}

//Créer la div demandé
//Créer et ajouter la description des produits dans le panier
//Ajouter les 3 objets dans la description
function addDescription(item) {
    const description = document.createElement("div")
    description.classList.add("cart__item__content__description")


    const h2 = document.createElement("h2")
    h2.textContent = item.name
    const p = document.createElement("p")
    p.textContent = item.color
    const p2 = document.createElement("p")
    p2.textContent = item.price + "€"

    description.appendChild(h2)
    description.appendChild(p)
    description.appendChild(p2)

    return description
}

//Créer la div "cart__item__content__settings"
//Ajouter les 2 fonctions permettant de modifier la quantité et de supprimer des objets du panier
function addSettings(item) {
    const settings = document.createElement("div")
    settings.classList.add("cart__item__content__settings")

    addQuantityToSettings(settings, item)
    addDeleteToSettings(settings, item)
    return settings
}

//Créer la div "cart__item__content__settings__delete"
//On peut cliquer sur un bouton supprimer
//Cela va supprimer l'article du panier
//On relie la fonction a la div supérieur
function addDeleteToSettings(settings, item) {
    const div = document.createElement("div")
    div.classList.add("cart__item__content__settings__delete")
    div.addEventListener("click", () => deleteItem(item))

    const p = document.createElement("p")
    p.textContent = "Supprimer"
    div.appendChild(p)
    settings.appendChild(div)
}

//Trouver le produit dans le cart qui à l'id recherché
// Et supprimer l'id de cet item
function deleteItem(item) {
    const itemToDelete = cart.findIndex(
        (product) => product.id === item.id && product.color === item.color)
        cart.splice(itemToDelete, 1)
        displayTotalPrice()
        displayTotalQuantity()
        deleteDataFromCache(item)
        deleteArticleFromPage(item)
}

//Cela va supprimer l'article qui a le bon id d'item et de color de l'article qu'on veut supprimer
function deleteArticleFromPage(item) {
    const articleToDelete = document.querySelector(`article[data-id="${item.id}"][data-color="${item.color}"]`)
    articleToDelete.remove()
}

//Créer la div "cart__item__content__settings__quantity"
//Créer tout les input nécéssaire pour que la fonction marche
//Pouvoir modifier la quantité de chaque article du panier
//Le minimum est de 1 et le maximum est de 100
//Cela va automatiquement s'ajouter à la quantité additionnée totale
function addQuantityToSettings(settings, item) {
    const quantity = document.createElement("div")
    quantity.classList.add("cart__item__content__settings__quantity")
    const p = document.createElement("p")
    p.textContent = " Qté : "
    quantity.appendChild(p)
    const input = document.createElement("input")
    input.type = "number"
    input.classList.add("itemQuantity")
    input.name = "itemQuantity"
    input.min = "1"
    input.max = "100"
    input.value = item.quantity
    input.addEventListener("input", () => updateTotal(item.id, input.value, item))

    quantity.appendChild(input)
    settings.appendChild(quantity)
}

//Récuperer le cart
//Récupérer la nouvelle quantité dans le cart 
//La nouvelle quantité remplace l'ancienne 
//Cette nouvelle quantité est distribué au fonction qui l'a demande
function updateTotal(id, newValue, item) {
    const itemUpdate = cart.find((item) => item.id === id)
    itemUpdate.quantity = Number(newValue)
    item.quantity = itemUpdate.quantity
    displayTotalQuantity()
    displayTotalPrice()
    newDataUpdateToCache(item)
}

//Supprimer l'ancienne valeur du cache
function deleteDataFromCache(item) {
  const key = `${item.id}-${item.color}`
  localStorage.removeItem(key)  
}

//Ajouter la nouvelle valeur dans le cache
//La convertir en JSON grâce au stringify
//Sauvegarder cette valeur dans le localStorage
function newDataUpdateToCache(item) {
    const dataToSave = JSON.stringify(item)
    const key = `${item.id}-${item.color}`
    localStorage.setItem(key, dataToSave)
}

//Fabriquer une classe article pour chaque objet dans le panier
function displayArticle(article) {
    document.querySelector("#cart__items").appendChild(article)
}

//Créer la classe article
//Lui ajouter l'attribut id
//Lui ajouter  l'attribut color
function addArticle(item) {
    const article = document.createElement("article")
    article.classList.add("cart__item")
    article.dataset.id = item.id
    article.dataset.color = item.color
    return article
}

//Créer la div demandé ainsi que la source de l'image et son altxt
//Afficher l'image de l'article dans le panier
function addImageAndDiv(item) {
    const div = document.createElement("div")
    div.classList.add("cart__item__img")

    const image = document.createElement("img")
    image.src = item.imageUrl
    image.alt = item.altTxt
    div.appendChild(image)
    return div
}

//S'il n'y a aucun item sélectionné une alerte va s'afficher
//Poster les données de la commande 
//En postant les données complètes on va arriver sur la page de confirmation 
//Si les différents champs du form sont invalides la commande ne s'enregistre pas
function submitForm(e) {
    e.preventDefault() 
    if (cart.length === 0) { 
        alert("Please select items")
    return 
    } 

    if (validateForm()) return
    if (validateEmail()) return
    if (detectWord()) return
    if (validateAddress()) return

    const body = addRequestBody()
    fetch("http://localhost:3000/api/products/order", {
        method : "POST",
        body : JSON.stringify(body),
        headers : {
            "Content-Type": "application/json"
        }
    })
    .then((res) => res.json())
    .then((data) => {
        const orderId = data.orderId
        window.location.href = "/front/html/confirmation.html" + "?orderId=" + orderId
    })
    .catch((err) => console.log(err))
}

//La commande est accepté que si tout les champs de formulaire sont tous remplis
function validateForm() {
    const form = document.querySelector(".cart__order__form")
    const inputs = form.querySelectorAll("input")
    inputs.forEach((input) => {
        if (input.value === "") {
            alert("Please fill all the fields")
            return true
        }
        return false
 })
}

//L'adresse est validé que si elle remplit les normes imposé par la regex
function validateAddress() {
    const address = document.querySelector("#address").value
    const regex = /^(?:[0-8]\d|9[0-8])\d{3}$/
    if (regex.test(address) === true) {
        alert ("Please enter a valid address")
        return true
    }
    return false
}

//L'email est validé que si elle remplit les normes imposé par la regex
function validateEmail() {
    const email = document.querySelector("#email").value
    const regex = /^[A-Za-z0-9+_.-]+@(.+)$/
    if (regex.test(email) === false) {
        alert("Please enter a valid email")
        return true
    }
    return false
}

//Le nom, prénom et la ville sont validés que s'ils remplissent les normes imposés par la regex
function detectWord() {
    const form = document.querySelector(".cart__order__form").value
    const regex = /\d/g;
    if (regex.test(firstName.value) === true) {
        alert("Please enter a valid first name")
        return true
    }
    if (regex.test(lastName.value) === true) {
        alert("Please enter a valid last name")
        return true
    }
    if (regex.test(city.value) === true) {
        alert("Please enter valid city")
        return true
    }
    return false
}

//Récuperer les champs remplis du form 
//Tout ces champs remplis sont nécéssaire pour finaliser la commande
//Par la suite ils seront envoyés grâce à Fetch
function addRequestBody() {
    const form = document.querySelector(".cart__order__form")
    const firstName = form.elements.firstName.value
    const lastName = form.elements.lastName.value
    const address = form.elements.address.value
    const city = form.elements.city.value
    const email = form.elements.email.value
    const body = { 
        contact : {
            firstName : firstName,
            lastName: lastName,
            address: address,
            city: city,
            email: email
        },
        products : getIdsFromStorage()
    }

    return body
}

//Récupérer les id du localStorage
//Pour ensuite envoyer l'id récuperé grâce à la requete POST
function getIdsFromStorage() {
    const numberOfProducts = localStorage.length
    const ids = []
    for (let i = 0; i < numberOfProducts; i++) {
        const key =localStorage.key(i)
        const id = key.split("-")[0]
        ids.push(id)
    }
    return ids
}