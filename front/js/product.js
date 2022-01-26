const queryString = window.location.search
const urlParams = new URLSearchParams(queryString)
const id = urlParams.get("id")
if (id != null) {
    let priceProduct = 0
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
    priceProduct = price
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
        if (color === "" ) {
            alert ("Please select a color");
            return;
        }
        const quantity = document.querySelector("#quantity").value
        if (quantity == 0 ) {
            alert ("Please select at least 1 item");
            return;
        }
        if (quantity > 100 ) {
            alert ("You cannot select more than 100 items");
            return;
        }
        saveCart(color, quantity)
    })
}


async function saveCart(color, quantity) {
    const key = `${id}-${color}`
    const data = {
        id: id,
        color: color,
        quantity: Number(quantity),
        price : priceProduct,
        imageUrl: imgUrl,
        altTxt: altText,
        name: itemName
    }
    localStorage.setItem(key, JSON.stringify(data))
}

/*
const price = document.getElementById("price")
const priceProduct = await (fetch(`http://localhost:300/api/products/${id}`)).json().price
*/