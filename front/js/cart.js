const cart = []


/*test*/


retrieveItems()
cart.forEach((item) => displayItem(item))

const orderButton = document.querySelector("#order")
orderButton.addEventListener("click", (e) => submitForm(e))

function retrieveItems() {
    const numberOfItems = localStorage.length
    for (let i = 0; i < numberOfItems; i++) {
        const item = localStorage.getItem(localStorage.key(i))
        const itemObject = JSON.parse(item)
        cart.push(itemObject)
    }

}

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

function displayTotalQuantity() {
    const totalQuantity = document.querySelector("#totalQuantity")
    const total = cart.reduce((total, item) => total + item.quantity, 0)
    totalQuantity.textContent = total
}

function displayTotalPrice() {
    let total = 0
    const totalPrice = document.querySelector("#totalPrice")
    cart.forEach((item) => {
        const totalUnitPrice = item.price * item.quantity
        total += totalUnitPrice
    })
    totalPrice.textContent = total
}

function addCartContent(item) {
    const cartItemContent = document.createElement("div")
    cartItemContent.classList.add("cart__item__content")

    const description = addDescription(item)
    const settings = addSettings(item)

    cartItemContent.appendChild(description)
    cartItemContent.appendChild(settings)

    return cartItemContent
}

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

function addSettings(item) {
    const settings = document.createElement("div")
    settings.classList.add("cart__item__content__settings")

    addQuantityToSettings(settings, item)
    addDeleteToSettings(settings, item)
    return settings
}

function addDeleteToSettings(settings, item) {
    const div = document.createElement("div")
    div.classList.add("cart__item__content__settings__delete")
    div.addEventListener("click", () => deleteItem(item))

    const p = document.createElement("p")
    p.textContent = "Supprimer"
    div.appendChild(p)
    settings.appendChild(div)
}

function deleteItem(item) {
    const itemToDelete = cart.findIndex(
        (product) => product.id === item.id && product.color === item.color)
        cart.splice(itemToDelete, 1)
        displayTotalPrice()
        displayTotalQuantity()
        deleteDataFromCache(item)
        deleteArticleFromPage(item)
}

function deleteArticleFromPage(item) {
    const articleToDelete = document.querySelector(`article[data-id="${item.id}"][data-color="${item.color}"]`)
    articleToDelete.remove()
}

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

function updateTotal(id, newValue, item) {
    const itemUpdate = cart.find((item) => item.id === id)
    itemUpdate.quantity = Number(newValue)
    item.quantity = itemUpdate.quantity
    displayTotalQuantity()
    displayTotalPrice()
    newDataUpdateToCache(item)
}

function deleteDataFromCache(item) {
  const key = `${item.id}-${item.color}`
  localStorage.removeItem(key)  
}

function newDataUpdateToCache(item) {
    const dataToSave = JSON.stringify(item)
    const key = `${item.id}-${item.color}`
    localStorage.setItem(key, dataToSave)
}

function displayArticle(article) {
    document.querySelector("#cart__items").appendChild(article)
}

function addArticle(item) {
    const article = document.createElement("article")
    article.classList.add("cart__item")
    article.dataset.id = item.id
    article.dataset.color = item.color
    return article
}

function addImageAndDiv(item) {
    const div = document.createElement("div")
    div.classList.add("cart__item__img")

    const image = document.createElement("img")
    image.src = item.imageUrl
    image.alt = item.altTxt
    div.appendChild(image)
    return div
}

function submitForm(e) {
    e.preventDefault() 
    if (cart.length === 0) { 
        alert("Please select items")
    return 
    } 

    if (validateForm()) return
    if (validateEmail()) return
    if (detectWord()) return

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

function validateEmail() {
    const email = document.querySelector("#email").value
    const regex = /^[A-Za-z0-9+_.-]+@(.+)$/
    if (regex.test(email) === false) {
        alert("Please enter valid email")
        return true
    }
    return false
}

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