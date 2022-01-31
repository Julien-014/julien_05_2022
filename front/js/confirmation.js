
const orderId = getOrderId()
displayOrderId(orderId)
removeEverything()

//Récuperer les params
//Récuperer l'order id
function getOrderId() {
    const queryString = window.location.search
    const urlParams = new URLSearchParams(queryString)
    return urlParams.get("orderId")
}

//Afficher le numéro de commande
function displayOrderId(orderId) {
    const orderIdElement = document.getElementById("orderId")
    orderIdElement.textContent = orderId
}

//Une fois la commande passée, tout supprimer du localStorage
function removeEverything() {
    const cache = window.localStorage
    cache.clear()
}

/* test */