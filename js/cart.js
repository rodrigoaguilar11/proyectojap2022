let cartURL = CART_INFO_URL + "25801" + EXT_TYPE;
let productos;
let cart = document.getElementById("cart");


console.log("Productos: " + productos);
console.log("cartURL: " + cartURL);

document.addEventListener("DOMContentLoaded", function (e) {
getJSONData(cartURL).then(function (resultObj) {
    if (resultObj.status === "ok") {
        showCartList(resultObj.data);
        productos = (resultObj.data);
    }
});   

});

function showCartList(array) {
        cart.innerHTML = `
        <div>
            <h3>user: ${array.user}</h3>
            <h3>articles: </h3>
            <h3>id: ${array.articles[0].id}</h3>
            <h3>name: ${array.articles[0].name}</h3>
            <h3>count: ${array.articles[0].count}</h3>
            <h3>unitCost: ${array.articles[0].unitCost}</h3>
            <h3>currency: ${array.articles[0].currency}</h3>
            <img src=${array.articles[0].image}>
        </div>
        `;
}