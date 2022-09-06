const productID = localStorage.getItem("productID");
let productInfo = PRODUCT_INFO_URL + productID + EXT_TYPE;
let productComments = PRODUCT_INFO_COMMENTS_URL + productID + EXT_TYPE;
let productName = document.getElementById("productName");

let id, pname, unitCost, currency, image;
document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(productInfo).then(function (resultObj) {
        if (resultObj.status === "ok") {
            showProductInfo(resultObj.data);
        }
    });

    getJSONData(productComments).then(function (resultObj) {
        if (resultObj.status === "ok") {
            showComments(resultObj.data);
        }
    });

    document.getElementById("addToCart").addEventListener("click", () => {
        addItemToCart();
    })

    document.getElementById("sendComment").addEventListener("click", () => {
        addComment();
    })

    //End of DOMContentLoaded
})

function showProductInfo(array) {
    productName.innerHTML = array.name;

    let catID = localStorage.getItem("catID");
    let product;
    if (catID == "101") {
        product = "Autos";
    } else if (catID == "102") {
        product = "Juguetes";
    } else if (catID == "103") {
        product = "Muebles";
    } else if (catID == "104") {
        product = "Herramientas";
    } else if (catID == "105") {
        product = "Computadoras";
    } else if (catID == "106") {
        product = "Vestimenta";
    } else if (catID == "107") {
        product = "Electrodomesticos";
    } else if (catID == "108") {
        product = "Deporte";
    } else if (catID == "109") {
        product = "Celulares";
    }
    document.getElementById("productsBar").innerHTML = product;
    document.getElementById("product-infoBar").innerHTML = array.name;
    //Variables used in addItemToCart
    id = array.id
    pname = array.name;
    unitCost = array.cost;
    currency = array.currency;
    image = array.images[0];
    document.getElementById("cat-list-container").innerHTML += `
<div class="col-10 list-group-item justify-content-between">
     <h4>` + "Nombre: " + array.name + `</h4> 
     <h4>` + "Precio: " + array.currency + " " + array.cost + `</h4> 
     <p> ` + "Descripcion: " + array.description + `</p> 
     <p>` + "Cantidad de Vendidos: " + array.soldCount + `</p> 
</div>
<div class="col-5">
    <div class="d-flex w-100 justify-content-between">
           <img id="img1" src="` + array.images[0] + `" alt="product image" class="img-thumbnail">
           <img id="img2" src="` + array.images[1] + `" alt="product image" class="img-thumbnail">
    </div>   
    <div class="d-flex w-100 justify-content-between">
           <img id="img3" src="` + array.images[2] + `" alt="product image" class="img-thumbnail">
           <img id="img4" src="` + array.images[3] + `" alt="product image" class="img-thumbnail">
    </div>   
</div>   
        `;
    document.getElementById("relatedProducts").innerHTML += `
    <div class="col-6">
        <div class="d-flex w-100 justify-content-between">
              <div onclick="setProductID(${array.relatedProducts[0].id})" class="list-group-item list-group-item-action cursor-active">
                <h4>` + array.relatedProducts[0].name + `</h4> 
                <img src="` + array.relatedProducts[0].image + `" alt="product image" class="img-thumbnail">
              </div>

              <div onclick="setProductID(${array.relatedProducts[1].id})" class="list-group-item list-group-item-action cursor-active">
                <h4>` + array.relatedProducts[1].name + `</h4> 
                <img src="` + array.relatedProducts[1].image + `" alt="product image" class="img-thumbnail">
              </div>
        </div>         
    </div>  
        <br>
        `;
}

function setProductID(id) {
    localStorage.setItem("productID", id);
    window.location = "product-info.html"
}

function showComments(array) {
    if (array.length > 0) {
        for (let i = 0; i < array.length; i++) {
            let stars;
            if (array[i].score == 1) {
                stars = "img/stars-1.jpg";
            } else if (array[i].score == 2) {
                stars = "img/stars-2.jpg";
            } else if (array[i].score == 3) {
                stars = "img/stars-3.jpg";
            } else if (array[i].score == 4) {
                stars = "img/stars-4.jpg";
            } else if (array[i].score == 5) {
                stars = "img/stars-5.jpg";
            }
            document.getElementById("comments").innerHTML += `
<div class="col-10 row list-group-item">
    <div class="col">
    <div class="d-flex w-100 justify-content-between">
    <img src="` + stars + `" style="width:13em"></img>
        <h4>` + array[i].user + `</h4>     
        <p>` + array[i].dateTime + `</p> 
    </div>
        <h5> ` + array[i].description + `</h5> 
    </div>
</div>
        `;
        }
    } else {
        document.getElementById("comments").innerHTML += `
        <div class="col-10 row list-group-item">
                <h4>` + "Aun no hay comentarios para esta publicación" + `</h4> 
        </div>
    `;
    }
}
//Add item to cart______________________________________________________
function addItemToCart() {
    let count = document.getElementById("count").value;
    if (localStorage.getItem("cart").includes(id && pname && image && unitCost)) {
        alert("si incluye")
        let addCount = JSON.parse(localStorage.getItem("cart"));

        console.log(addCount);
    } else {

        let product = {
            "articles": [{
                "id": id,
                "name": pname,
                "count": count,
                "unitCost": unitCost,
                "currency": currency,
                "image": image
            }]
        };
        let string = JSON.parse(localStorage.getItem("cart"));
        string.push(product);
        localStorage.setItem("cart", JSON.stringify(string));
        checkCart()
    }
}

function addComment() {
//Comentario
    let comment = document.getElementById("comment").value;
//Puntuacion
    let puntuationInput = document.getElementById("puntuation");
    let puntuation = puntuationInput.selectedOptions[0].value;
console.log("Puntuation", puntuation);
    let estrellas;
    if (puntuation == 1) {
        estrellas = "img/stars-1.jpg";
    } else if (puntuation == 2) {
        estrellas = "img/stars-2.jpg";
    } else if (puntuation== 3) {
        estrellas = "img/stars-3.jpg";
    } else if (puntuation == 4) {
        estrellas = "img/stars-4.jpg";
    } else if (puntuation == 5) {
        estrellas = "img/stars-5.jpg";
    }
//Fecha
    let today = new Date(),
        day = today.getDate(),
        month = today.getMonth() + 1,
        year = today.getFullYear(),
        hour = today.getHours(),
        minutes = today.getMinutes(),
        seconds = today.getSeconds();
    if (month < 10) {
        month = "0" + month;
    }
    if (hour < 10) {
        hour = "0" + hour;
    }
    if (minutes < 10) {
        minutes = "0" + minutes;
    }
    if(seconds <10){
        seconds = "0" + seconds;
       }
    let actualDate = (`${year}-${month}-${day} ${hour}:${minutes}:${seconds}`);
    console.log(`${year}-${month}-${day} ${hour}:${minutes}:${seconds}`);

    
    document.getElementById("comments").innerHTML += `
<div class="col-10 row list-group-item">
    <div class="col">
    <div class="d-flex w-100 justify-content-between">
    <img src="` + estrellas + `" style="width:13em"></img>
        <h4>` + localStorage.getItem("username") + `</h4>     
        <p>` + actualDate + `</p> 
    </div>
        <h5> ` + comment + `</h5> 
    </div>
</div>
        `;
}