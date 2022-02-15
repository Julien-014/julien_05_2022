// Récuperer les données sur les produits grâce a l'API Fetch et les passer à la fonction productsData
fetch("http://localhost:3000/api/products")
  .then((response) => response.json())
  .then((res) => productsData(res));

//Récuperer les données récupérées par l'API Fetch
//Ajouter les données récupérées aux éléments crées qui sont présent dans la fonction ( ex: image,h3 ..)
//Ajouter ces éléments dans la classe article par la suite
//Ajouter tout le contenu de la classe article dans l'anchor
function productsData(product) {
  //Boucle permettant de répéter les actions effectués à tout les produits présent dans les données
  for (const kanap of product) {
    const { _id, imageUrl, altTxt, name, description } = kanap;

    const anchor = addAnchor(_id);

    const article = addArticle();
    const image = addImage(imageUrl, altTxt);
    const h3 = addH3(name);
    const p = addParagraph(description);

    article.appendChild(image);
    article.appendChild(h3);
    article.appendChild(p);

    appendChildren(anchor, article);
  }
}

// Créer un lien vers la page produit qui nous amènera sur le produit qu'on sélectionnera
function addAnchor(id) {
  const anchor = document.createElement("a");
  anchor.href = "./product.html?id=" + id;
  return anchor;
}

// Placer l'anchor et la classe article dans la section items dans le HTML
function appendChildren(anchor, article) {
  const items = document.querySelector("#items");
  if (items != null) {
    items.appendChild(anchor);
    anchor.appendChild(article);
  }
}

// Fonction créant une classe article dans la 1ère page HTML du site
function addArticle() {
  const article = document.createElement("article");
  return article;
}

//Fonction créant un lien d'image et un altxt dans le HTML qui vont se remplir avec les données collectées grace à l'API
function addImage(imageUrl, altTxt) {
  const image = document.createElement("img");
  image.src = imageUrl;
  image.alt = altTxt;
  return image;
}

//Fonction créant un h3 dans le HTML qui va se remplir avec les données collectées grace à l'API
function addH3(name) {
  const h3 = document.createElement("h3");
  h3.textContent = name;
  h3.classList.add("productName");
  return h3;
}

//Fonction créant un p dans le HTML qui va se remplir avec les données collectées grace à l'API
function addParagraph(description) {
  const p = document.createElement("p");
  p.textContent = description;
  p.classList.add("productDescription");
  return p;
}
