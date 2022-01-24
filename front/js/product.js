const queryString = window.location.search
const urlParams = new URLSearchParams(queryString)
const id = urlParams.get("id")
if (id != null) {
    let productPrice = 0
    let imgUrl, altText, itemName
}

fetch(`http://localhost:3000/api/products/${id}`)
    .then(response => response.json())
    .then(res => takeData(res))

function takeData(sofa) {

    const altTxt = sofa.altTxt
    const colors = sofa.colors
    const description = sofa.description
    const imageUrl = sofa.imageUrl
    const name = sofa.name
    const price = sofa.price
    productPrice = price
    imgUrl = imageUrl
    altText = altTxt
    itemName = name
    addImage(imageUrl, altTxt)
    addTitle(name)
    addPrice(price)
    addDescription(description)
    addColors(colors)

}

function addImage(imageUrl, altTxt) {
    const image = document.createElement("img")
    image.src = imageUrl
    image.alt = altTxt
    const parent = document.querySelector(".item__img")
    if (parent != null) parent.appendChild(image)
}

function addTitle(name) {
    const h1 = document.querySelector("#title")
    if (h1 != null) h1.textContent = name
}


function addPrice(price) {
    const span = document.querySelector("#price")
    if (span != null) span.textContent = price
}

function addDescription(description) {
    const p = document.querySelector("#description")
    if (p != null) p.textContent = description
}

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

const button = document.querySelector("#addToCart")
if (button != null) {
    button.addEventListener("click", (e) => {
        const color = document.querySelector("#colors").value
        const quantity = document.querySelector("#quantity").value
        saveCart(color, quantity)
    })
}

function saveCart(color, quantity) {
    const key = `${id}-${color}`
    const data = {
        id: id,
        color: color,
        quantity: Number(quantity),
        price: productPrice,
        imageUrl: imgUrl,
        altTxt: altText,
        name: itemName
    }
    localStorage.setItem(key, JSON.stringify(data))
}


