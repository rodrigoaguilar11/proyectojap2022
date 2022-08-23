let categoriesArray = [];

function showCategoriesList(array) {
    document.getElementById("cat-list-container").innerHTML="";
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
    } else if (localStorage.getItem("catID") == "107") {
        catID = ELECTRODOMESTICOS;
    } else if (localStorage.getItem("catID") == "108") {
        catID = DEPORTE;
    } else if (localStorage.getItem("catID") == "109") {
        catID = CELULARES;
    }
    //Asignar ID a la Lista
    let productos;
    getJSONData(catID).then(function (resultObj) {
        if (resultObj.status === "ok") {
            showCategoriesList(resultObj.data.products);
            productos = (resultObj.data.products);
            console.log(productos);
        }
    });
    //Ordenadores

    document.getElementById("sortAsc").addEventListener("click", () => {
        console.log("sortAsc called");
        productos.sort((o1, o2) => {
            if (o1.cost < o2.cost) {
                return 1;
            } else if (o1.cost > o2.cost) {
                return -1;
            } else {
                return 0;
            }
        });
        showCategoriesList(productos);
    })
    document.getElementById("sortDesc").addEventListener("click", () => {
        console.log("sortDesc called");
        productos.sort((o1, o2) => {
            if (o1.cost < o2.cost) {
                return -1;
            } else if (o1.cost > o2.cost) {
                return 1;
            } else {
                return 0;
            }    
        });
        showCategoriesList(productos);
    })
    document.getElementById("rel").addEventListener("click", () => {
        console.log("rel called");
        productos.sort((o1, o2) => {
            if (o1.soldCount > o2.soldCount) {
                return -1;
            } else if (o1.soldCount < o2.soldCount) {
                return 1;
            } else {
                return 0;
            }    
        });
        showCategoriesList(productos);

    })
    //Fin de DOMContentLoaded
});