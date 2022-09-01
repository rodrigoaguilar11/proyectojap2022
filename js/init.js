const CATEGORIES_URL = "https://japceibal.github.io/emercado-api/cats/cat.json"; //Json de Categories html
const PRODUCTS_URL = "https://japceibal.github.io/emercado-api/cats_products/";
const PRODUCT_INFO_URL = "https://japceibal.github.io/emercado-api/products/";
const PRODUCT_INFO_COMMENTS_URL = "https://japceibal.github.io/emercado-api/products_comments/";
const CART_INFO_URL = "https://japceibal.github.io/emercado-api/user_cart/";
const CART_BUY_URL = "https://japceibal.github.io/emercado-api/cart/buy.json"; //¡Has comprado con éxito!
const PUBLISH_PRODUCT_URL = "https://japceibal.github.io/emercado-api/sell/publish.json"; //Has publicado con exito
const EXT_TYPE = ".json";

let showSpinner = function () {
  document.getElementById("spinner-wrapper").style.display = "block";
}

let hideSpinner = function () {
  document.getElementById("spinner-wrapper").style.display = "none";
}

let getJSONData = function (url) {
  let result = {};
  showSpinner();
  return fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw Error(response.statusText);
      }
    })
    .then(function (response) {
      result.status = 'ok';
      result.data = response;
      hideSpinner();
      return result;
    })
    .catch(function (error) {
      result.status = 'error';
      result.data = error;
      hideSpinner();
      return result;
    });
}


if (localStorage.getItem("username") == undefined || localStorage.getItem("password") == undefined) {
  location.href = "login.html";

}
document.getElementById("profile").innerHTML += '<span style= color:lightblue; font-size:30px; font-weight:bold;>' + localStorage.getItem("username") + '</span>';

function closeSesion() {
  localStorage.clear();
  location.href = "login.html";

}
document.addEventListener("DOMContentLoaded", function () {
  checkCart()

  
  //Emd of DOMContentLoaded
});

//Create cart array key on localStorage if no exist
function checkCart() {
  if (localStorage.getItem("cart") === null) {
    localStorage.setItem("cart", JSON.stringify([]));
  }
  document.getElementById("cartNumber").innerHTML = JSON.parse(localStorage.getItem("cart")).length;
}