let categoriesArray = [];

function showCategoriesList(array) {
    document.getElementById("cat-list-container").innerHTML = "";
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
    let productsh1 = document.getElementById("productsh1");
    if (localStorage.getItem("catID") == "101") {
        catID = AUTOS;
        productsh1.innerHTML = "Autos";
    } else if (localStorage.getItem("catID") == "102") {
        catID = JUGUETES;
        productsh1.innerHTML = "Juguetes";
    } else if (localStorage.getItem("catID") == "103") {
        catID = MUEBLES;
        productsh1.innerHTML = "Muebles";
    } else if (localStorage.getItem("catID") == "104") {
        catID = HERRAMIENTAS;
        productsh1.innerHTML = "Herramientas";
    } else if (localStorage.getItem("catID") == "105") {
        catID = COMPUTADORAS;
        productsh1.innerHTML = "Computadoras";
    } else if (localStorage.getItem("catID") == "106") {
        catID = VESTIMENTA;
        productsh1.innerHTML = "Vestimenta";
    } else if (localStorage.getItem("catID") == "107") {
        catID = ELECTRODOMESTICOS;
        productsh1.innerHTML = "Electrodomesticos";
    } else if (localStorage.getItem("catID") == "108") {
        catID = DEPORTE;
        productsh1.innerHTML = "Deporte";
    } else if (localStorage.getItem("catID") == "109") {
        catID = CELULARES;
        productsh1.innerHTML = "Celulares";
    }
    //Asignar ID a la Lista
    let productos;
    getJSONData(catID).then(function (resultObj) {
        if (resultObj.status === "ok") {
            showCategoriesList(resultObj.data.products);
            productos = (resultObj.data.products);
            //console.log(productos);
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
    //Filtro por precio
    document.getElementById("rangeFilterCount").addEventListener("click", () => {
        let min = document.getElementById("filterMin").value;
        let max = document.getElementById("filterMax").value;
        if (min == "" && max == "") {
            min = "0";
            max = "99999999999";
        } else if (min == "") {
            min = "0";
        } else if (max == "") {
            max = "99999999999";
        }
        let result = productos.filter(p => p.cost >= min && p.cost <= max);
        result.sort((a, b) => a.cost - b.cost);
        showCategoriesList(result);
    })
    
//filtrado por nombre
document.getElementById("filterSearch").addEventListener("input", () => {
    let search = document.getElementById("filterSearch").value;
    let result = productos.filter(p => p.name.includes(search));
    result.sort((a, b) => a.search - b.search);
    showCategoriesList(result);
})
//Boton de Limpiar
    document.getElementById("clearRangeFilter").addEventListener("click", () => {
        document.getElementById("filterMax").value = "";
        document.getElementById("filterMin").value = "";
        document.getElementById("filterSearch").value = "";
        showCategoriesList(productos);
    })
    //Fin de DOMContentLoaded
});

//Ordenar lista
function filtrar() {
    let inicial = parseInt(document.getElementById("inicio").value);
    let final = parseInt(document.getElementById("final").value);
    let listaFiltrada = personas.filter(persona => persona.edad >= inicial && persona.edad <= final);
    listaFiltrada.sort((ant, sig) => ant.edad - sig.edad);
    mostrar(listaFiltrada);
}