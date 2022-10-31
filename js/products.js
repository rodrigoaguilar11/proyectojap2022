document.addEventListener("DOMContentLoaded", function (e) {
    let catID = PRODUCTS_URL + localStorage.getItem("catID") + EXT_TYPE;
    //Asignar Json a la Lista
    let productos, catName;
    getJSONData(catID).then(function (resultObj) {
        if (resultObj.status === "ok") {
            productos = (resultObj.data.products);
            showProductsList(productos);
            catName = (resultObj.data.catName);
            document.getElementById("productsh1").innerHTML = catName;
            document.getElementById("productCategory").innerHTML = catName;
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
        showProductsList(productos);
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
        showProductsList(productos);
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
        showProductsList(productos);

    })
    //Filtro por precio
    document.getElementById("rangeFilterCount").addEventListener("click", () => {
        let min = document.getElementById("filterMin").value;
        let max = document.getElementById("filterMax").value;
        if (min == "") {
            min = "0";
        }
        if (max == "") {
            max = Infinity;
        }
        let result = productos.filter(p => p.cost >= min && p.cost <= max);
        result.sort((a, b) => a.cost - b.cost);
        showProductsList(result);
    })

    //filtrado por nombre
    document.getElementById("filterSearch").addEventListener("input", () => {
        let search = document.getElementById("filterSearch").value;
        let result = productos.filter(p => p.name.includes(search) || p.description.includes(search));
        result.sort((a, b) => a.search - b.search);
        showProductsList(result);
    })
    //Boton de Limpiar
    document.getElementById("clearRangeFilter").addEventListener("click", () => {
        document.getElementById("filterMax").value = null;
        document.getElementById("filterMin").value = null;
        document.getElementById("filterSearch").value = null;
        showProductsList(productos);
    })
    //Fin de DOMContentLoaded
});

function showProductsList(products) {
    document.getElementById("cat-list-container").innerHTML = "";
    if (products.length > 0) {
        let actualList="";
        for (product of products) {
             actualList +=`
        <div onclick="setProductID(${product.id})" class="col-sm-6 col-md-4 col-lg-3 list-group-item cursor-active shadow border-item p-2 mb-2">
            <div class="row">
                    <h4>${product.name}</h4> 
                    <img src="${product.image}" alt="product image">
                    <h4>${product.currency} ${product.cost}</h4> 
                    <p>${product.description}</p> 
                    <p>${product.soldCount} vendidos</p> 
            </div>
        </div>
        `;
        }
        document.getElementById("cat-list-container").innerHTML += actualList;
    } else {
        document.getElementById("cat-list-container").innerHTML += `
    <div class="row list-group-item">
        <div class="col">
            <h4>Aun no hay productos para esta categoria</h4> 
        </div>
    </div>
`;
    }
}

function setProductID(id) {
    localStorage.setItem("productID", id);
    window.location = "product-info.html"
}