const CATEGORIES_URL = "https://japceibal.github.io/emercado-api/cats/cat.json";//Json de Categories html
const PUBLISH_PRODUCT_URL = "https://japceibal.github.io/emercado-api/sell/publish.json";//Has publicad con exito
const PRODUCTS_URL = "https://japceibal.github.io/emercado-api/cats_products/";
const PRODUCT_INFO_URL = "https://japceibal.github.io/emercado-api/products/";
const PRODUCT_INFO_COMMENTS_URL = "https://japceibal.github.io/emercado-api/products_comments/";
const CART_INFO_URL = "https://japceibal.github.io/emercado-api/user_cart/";
const CART_BUY_URL = "https://japceibal.github.io/emercado-api/cart/buy.json";
const EXT_TYPE = ".json";
//autos
const AUTOS = "https://japceibal.github.io/emercado-api/cats_products/101.json";
const JUGUETES = "https://japceibal.github.io/emercado-api/cats_products/102.json";
const MUEBLES = "https://japceibal.github.io/emercado-api/cats_products/103.json";
const HERRAMIENTAS = "https://japceibal.github.io/emercado-api/cats_products/104.json";
const COMPUTADORAS = "https://japceibal.github.io/emercado-api/cats_products/105.json";
const VESTIMENTA = "https://japceibal.github.io/emercado-api/cats_products/106.json";
const ELECTRODOMESTICOS = "https://japceibal.github.io/emercado-api/cats_products/107.json";
const DEPORTE = "https://japceibal.github.io/emercado-api/cats_products/108.json";
const CELULARES = "https://japceibal.github.io/emercado-api/cats_products/109.json";


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

