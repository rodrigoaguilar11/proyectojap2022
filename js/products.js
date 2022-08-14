//array donde se cargarán los datos recibidos:
let categoriesArray = [];

//función que recibe un array con los datos, y los muestra en pantalla a través el uso del DOM
function showCategoriesList(array) {
    for (let i = 0; i < array.length; i++) {
        document.getElementById("cat-list-container").innerHTML += `
        <div class="list-group-item list-group-item-action">
            <div class="row">
                <div class="col-3">
                    <img src="` + array[i].image + `" alt="product image" class="img-thumbnail">
                </div>
                <div class="col">
                    <div class="d-flex w-100 justify-content-between">
                        <div class="mb-1">
                        <h4>` + array[i].name + " - " + array[i].currency + " " + array[i].cost + `</h4> 
                        <p> ` + array[i].description + `</p> 
                        </div>
                        <small class="text-muted">` + array[i].soldCount + ` vendidos</small> 
                    </div>

                </div>
            </div>
        </div>
        `;
    }
}

document.addEventListener("DOMContentLoaded", function (e) {
    //Inicio DOMContentLoaded
    getJSONData(AUTOS).then(function (resultObj) {
        if (resultObj.status === "ok") {
            showCategoriesList(resultObj.data.products);
        }
    });
    //Fin de DOMContentLoaded
});