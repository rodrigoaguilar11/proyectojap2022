let categoriesArray = [];

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
    let catID;
    if (localStorage.getItem("catID") == "101") {
        catID = AUTOS;
    } else if (localStorage.getItem("catID") == "102") {
        catID = JUGUETES;
    } else if (localStorage.getItem("catID") == "103") {
        catID = MUEBLES;
    } else if (localStorage.getItem("catID") == "104") {
        catID = HERRAMIENTAS;
    } else if (localStorage.getItem("catID") == "105") {
        catID = COMPUTADORAS;
    } else if (localStorage.getItem("catID") == "106") {
        catID = VESTIMENTA;
    }else if (localStorage.getItem("catID") == "107") {
        catID = ELECTRODOMESTICOS;
    }else if (localStorage.getItem("catID") == "108") {
        catID = DEPORTE;
    }else if (localStorage.getItem("catID") == "109") {
        catID = CELULARES;
    }


    //Asignar ID a la Lista
    getJSONData(catID).then(function (resultObj) {
        if (resultObj.status === "ok") {
            showCategoriesList(resultObj.data.products);
        }
    });
    //Fin de DOMContentLoaded
});