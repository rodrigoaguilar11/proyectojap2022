const CATEGORIES_URL = "https://japceibal.github.io/emercado-api/cats/cat.json"; //Json de Categories html
const PRODUCTS_URL = "https://japceibal.github.io/emercado-api/cats_products/";
const PRODUCT_INFO_URL = "https://japceibal.github.io/emercado-api/products/";
const PRODUCT_INFO_COMMENTS_URL = "https://japceibal.github.io/emercado-api/products_comments/";
const CART_INFO_URL = "https://japceibal.github.io/emercado-api/user_cart/";
const CART_BUY_URL = "https://japceibal.github.io/emercado-api/cart/buy.json"; //¡Has comprado con éxito!
const PUBLISH_PRODUCT_URL = "https://japceibal.github.io/emercado-api/sell/publish.json"; //Has publicado con exito
const EXT_TYPE = ".json";
let actualUsername;
let body = document.getElementsByTagName("body")[0];
if (localStorage.getItem("wallpaper") != undefined) {
  let wallpaper = localStorage.getItem("wallpaper");
  body.style.backgroundImage ="url(" +wallpaper + ")";
}

let showSpinner = function () {
  document.getElementById("spinner-wrapper").style.display = "block";
}

let hideSpinner = function () {
  document.getElementById("spinner-wrapper").style.display = "none";
}

function setCatID(id) {
  localStorage.setItem("catID", id);
  window.location = "products.html"
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


if (localStorage.getItem("email") == undefined || localStorage.getItem("password") == undefined) {
  location.href = "login.html";
}

if (localStorage.getItem("personalData") != null) {
  let personalData = JSON.parse(localStorage.getItem("personalData"));
  actualUsername = personalData.firstName + " " + personalData.lastname;
  document.getElementById("profile").innerHTML += '<span>' + actualUsername + '</span>';
}else{
let username = localStorage.getItem("email");            
username = username.substring(0, username.indexOf('@'));
actualUsername = username;
document.getElementById("profile").innerHTML += '<span>' + actualUsername + '</span>';
}

function closeSesion() {
  localStorage.clear();
  location.href = "login.html";

}
document.addEventListener("DOMContentLoaded", function () {
  checkCart()
  setProfilePhoto()
  //End of DOMContentLoaded
});

//Create cart array key on localStorage if no exist
function checkCart() {
  if (localStorage.getItem("cart") === null) {
    localStorage.setItem("cart", JSON.stringify([]));
  }
  document.getElementById("cartNumber").innerHTML = JSON.parse(localStorage.getItem("cart")).length;
}
function setProfilePhoto(){
  if (localStorage.getItem("personalData") != null) {
    let personalData = JSON.parse(localStorage.getItem("personalData"));
    document.getElementById("navProfileImg").src = personalData.profilePhoto;
  }else{
    document.getElementById("navProfileImg").src = "../proyectojap2022/img/img_perfil.png";
  }
}