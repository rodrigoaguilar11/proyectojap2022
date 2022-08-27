let categoriesArray = [];

function showCategoriesList(array) {
    document.getElementById("cat-list-container").innerHTML = "";
    if(array.length > 0) {
    for (let i = 0; i < array.length; i++) {
        document.getElementById("cat-list-container").innerHTML += `
        <div onclick="setProductID(${array[i].id})" class="list-group-item list-group-item-action cursor-active">
            <div class="row">
                <div class="col-3">
                    <img src="` + array[i].image + `" alt="product image" class="img-thumbnail">
                </div>
                <div class="col">
                    <div class="d-flex w-100 justify-content-between">
                        <div class="mb-1">
                        <h4>` + array[i].name +`</h4> 
                        <h4>` + array[i].currency + " " + array[i].cost + `</h4> 
                        <p> ` + array[i].description + `</p> 
                        <p> ` + array[i].soldCount + ` vendidos </p> 
                        </div>
                    </div>

                </div>
            </div>
        </div>
        `;
    }
}else{
    document.getElementById("cat-list-container").innerHTML += `
    <div class="row list-group-item">
        <div class="col">
            <h4>`+ "Aun no hay productos para esta categoria" +`</h4> 
        </div>
    </div>
`;
    }
}
function setProductID(id) {
    localStorage.setItem("productID", id);
    window.location = "product-info.html"
}
document.addEventListener("DOMContentLoaded", function (e) {
    //Inicio DOMContentLoaded
    let catID = localStorage.getItem("catID");
    let productsh1;
    if (catID == "101") {
        productsh1 = "Autos";
    } else if (catID == "102") {
        productsh1 = "Juguetes";
    } else if (catID == "103") {
        productsh1 = "Muebles";
    } else if (catID == "104") {
        productsh1 = "Herramientas";
    } else if (catID == "105") {
        productsh1 = "Computadoras";
    } else if (catID == "106") {
        productsh1 = "Vestimenta";
    } else if (catID == "107") {
        productsh1 = "Electrodomesticos";
    } else if (catID == "108") {
        productsh1 = "Deporte";
    } else if (catID == "109") {
        productsh1 = "Celulares";
    }
    document.getElementById("productsh1").innerHTML=productsh1;
    document.getElementById("productCategory").innerHTML=productsh1;

    catID = PRODUCTS_URL + catID + EXT_TYPE;
    
    //Asignar Json a la Lista
    let productos;
    getJSONData(catID).then(function (resultObj) {
        if (resultObj.status === "ok") {
            showCategoriesList(resultObj.data.products);
            productos = (resultObj.data.products);
            //console.log(productos);
        }
    });
    //Botones Ordenadores
    document.getElementById("sortAsc").addEventListener("click", () => {
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
    let result = productos.filter(p => p.name.includes(search) ||p.description.includes(search) );
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

