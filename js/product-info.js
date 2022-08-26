document.getElementById("cat-list-container").innerHTML = "";
let productID = localStorage.getItem("productID");
productID = PRODUCT_INFO_URL + productID + EXT_TYPE;

document.addEventListener("DOMContentLoaded", function(e){
    let description;
    getJSONData(productID).then(function (resultObj) {
        if (resultObj.status === "ok") {
            description = (resultObj.data);
            showCategoriesList(description);
        }
    });
})

function showCategoriesList(array) {
        document.getElementById("cat-list-container").innerHTML += `
        <div class="col-3">
                <div class="d-flex w-100 justify-content-between">
                    <div class="mb-1">
                           <h4>` + array.name + `</h4> 
                           <h4>` + array.currency + " " + array.cost + `</h4> 
                           <p> ` + array.description + `</p> 
                           <p>` + array.soldCount + ` vendidos</p> 
                    </div>
                </div>

                <div class="d-flex w-100 justify-content-between">
                <img src="` + array.images[0] + `" alt="product image" class="img-thumbnail">
                    <img src="` + array.images[1] + `" alt="product image" class="img-thumbnail">
                    <img src="` + array.images[2] + `" alt="product image" class="img-thumbnail">
                    <img src="` + array.images[3] + `" alt="product image" class="img-thumbnail">
                </div>


                
                <div class="col">
                    <h2>Productos Relacionados</h2>

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
        </div>
        `;
}
function setProductID(id) {
    localStorage.setItem("productID", id);
    window.location = "product-info.html"
}