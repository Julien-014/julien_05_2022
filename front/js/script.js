fetch("http://localhost:3000/api/products")
    .then((response) => response.json())
    .then((res) => productsData(res))

function productsData(product) {

       
    for (let i = 0; i < product.length; i++) {
              
        const { _id, imageUrl, altTxt, name, description } = product[i]
        
        const anchor = addAnchor(_id)
        
        const article = addArticle()
        const image = addImage(imageUrl, altTxt) 
        const h3 = addH3(name)
        const p = addParagraph(description)
        
        article.appendChild(image)
        article.appendChild(h3)
        article.appendChild(p)
        
        appendChildren(anchor, article)
    }
    
 
}


function addAnchor(id) {
    const anchor = document.createElement("a")
    anchor.href = "./product.html?id=" + id
    return anchor
}

function appendChildren(anchor, article) {
    const items = document.querySelector("#items")
    if (items != null) {
        items.appendChild(anchor)
        anchor.appendChild(article)
    }
}

function addArticle() {
    const article = document.createElement("article")
    return article
}

function addImage(imageUrl, altTxt) {
    const image = document.createElement("img")
    image.src = imageUrl
    image.alt = altTxt
    return image
}
function addH3(name) {
    const h3 = document.createElement("h3")
    h3.textContent = name
    h3.classList.add("productName")
    return h3
}
function addParagraph(description) {
    const p = document.createElement("p")
    p.textContent = description
    p.classList.add("productDescription")
    return p
}