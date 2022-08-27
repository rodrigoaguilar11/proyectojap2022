
const productID = localStorage.getItem("productID");
let productInfo = PRODUCT_INFO_URL + productID + EXT_TYPE;
let productComments = PRODUCT_INFO_COMMENTS_URL + productID + EXT_TYPE;

console.log(productComments);

document.addEventListener("DOMContentLoaded", function(e){
    let description;
    getJSONData(productInfo).then(function (resultObj) {
        if (resultObj.status === "ok") {
            description = (resultObj.data);
            showProductInfo(description);
        }
    });

    let comments;
    getJSONData(productComments).then(function (resultObj) {
        if (resultObj.status === "ok") {
            comments = (resultObj.data);

            console.log(comments);

            showComments(comments); 
        }
    });

   
})

function showProductInfo(array) {
    let catID = localStorage.getItem("catID");
    let product;
    let href;
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
        document.getElementById("cat-list-container").innerHTML += `
        <p><a href="categories.html">Categorías</a> &lt; <a href="products.html">${product}</a></p>
<div class="col-12 list-group-item justify-content-between">
            <h4>` + "Nombre: " + array.name + `</h4> 
            <h4>` + "Precio: " + array.currency + " " + array.cost + `</h4> 
            <p> ` + "Descripcion: " + array.description + `</p> 
            <p>` + "Cantidad de Vendidos: " + array.soldCount + `</p> 
</div>
<div class="col-6">
    <div class="d-flex w-100 justify-content-between">
           <img src="` + array.images[0] + `" alt="product image" class="img-thumbnail">
           <img src="` + array.images[1] + `" alt="product image" class="img-thumbnail">
    </div>   
    <div class="d-flex w-100 justify-content-between">
           <img src="` + array.images[2] + `" alt="product image" class="img-thumbnail">
           <img src="` + array.images[3] + `" alt="product image" class="img-thumbnail">
    </div>   
</div>   


        `;
        document.getElementById("relatedProducts").innerHTML += `
    <div class="col">
        <div class="d-flex w-100 justify-content-between">
              <div onclick="setProductID(${array.relatedProducts[0].id})" class="list-group-item list-group-item-action cursor-active">
                <h4>` + array.relatedProducts[0].name +`</h4> 
                <img src="` + array.relatedProducts[0].image + `" alt="product image" class="img-thumbnail">
              </div>

              <div onclick="setProductID(${array.relatedProducts[1].id})" class="list-group-item list-group-item-action cursor-active">
                <h4>` + array.relatedProducts[1].name +`</h4> 
                <img src="` + array.relatedProducts[1].image + `" alt="product image" class="img-thumbnail">
              </div>
        </div>         
    </div>  
        
        `;
}
function setProductID(id) {
    localStorage.setItem("productID", id);
    window.location = "product-info.html"
}

function showComments(array) {
if (array.length > 0){
    for (let i = 0; i < array.length; i++) {
        document.getElementById("comments").innerHTML += `
<div class="row list-group-item">
    <div class="col">
        <h4>` + array[i].user +`</h4> 
        <h5> ` + array[i].description + `</h5> 
        <h7>` + "Puntuacion: " + array[i].score + `</h7> 
        <p>` + array[i].dateTime +`</p> 
    </div>
</div>
        `;
    }}else{
        document.getElementById("comments").innerHTML += `
        <div class="row list-group-item">
            <div class="col">
                <h4>`+ "Aun no hay comentarios para esta publicación" +`</h4> 
            </div>
        </div>
    `;
    }
}

