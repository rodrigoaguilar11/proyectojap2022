const PRODUCT_ID = localStorage.getItem("productID"),
    PRODUCT_INFO = PRODUCT_INFO_URL + PRODUCT_ID + EXT_TYPE,
    PRODUCTS_COMMENTS = PRODUCT_INFO_COMMENTS_URL + PRODUCT_ID + EXT_TYPE;
let id,
    rateCommentStars = 1,
    totalAverage = 0,
    totalAverageCount = 0,
    thereComments;

document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(PRODUCT_INFO).then(function (resultObj) {
        if (resultObj.status === "ok") {
            showProductInfo(resultObj.data);
        }
    });

    getJSONData(PRODUCTS_COMMENTS).then(function (resultObj) {
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
    document.getElementById("productName").innerHTML = array.name;

    let catID = localStorage.getItem("catID");
    let category;
    if (catID == "101") {
        category = "Autos";
    } else if (catID == "102") {
        category = "Juguetes";
    } else if (catID == "103") {
        category = "Muebles";
    } else if (catID == "104") {
        category = "Herramientas";
    } else if (catID == "105") {
        category = "Computadoras";
    } else if (catID == "106") {
        category = "Vestimenta";
    } else if (catID == "107") {
        category = "Electrodomesticos";
    } else if (catID == "108") {
        category = "Deporte";
    } else if (catID == "109") {
        category = "Celulares";
    }
    document.getElementById("productsBar").innerHTML = category;
    document.getElementById("product-infoBar").innerHTML = array.name;
    //Variables used in addItemToCart
    id = array.id;
    pname = array.name;
    unitCost = array.cost;
    currency = array.currency;
    image = array.images[0];

    document.getElementById("cat-list-container").innerHTML += `
     <h4>Nombre: ${array.name}</h4> 
     <h4>Precio: ${array.currency} ${array.cost}</h4> 
     <p>Descripcion: ${array.description}</p> 
     <p>Cantidad de Vendidos: ${array.soldCount}</p> 
`;
    for (img of array.images) {
        document.getElementById("images").innerHTML += `
        <div class="col-6">
        <img src="${img}" alt="product image" class="img-thumbnail">
        </div>
        `
    }
    document.getElementById("carrousel").innerHTML += `
    <div class="carousel-item active">
    <img src="${image}" class="d-block w-100" alt="product image">
    </div>
    `
    for (let i = 1; i < array.images.length; i++) {
        document.getElementById("carrousel").innerHTML += `
        <div class="carousel-item">
            <img src="${array.images[i]}" class="d-block w-100" alt="product image">
        </div>
        `
    }
    // Add Related Products
    for (relatedProduct of array.relatedProducts) {
        document.getElementById("relatedProducts").innerHTML += `
  <div onclick="setProductID(${relatedProduct.id})" class="list-group-item list-group-item-action cursor-active" style="text-align:center">
    <h4>${relatedProduct.name}</h4> 
    <img src="${relatedProduct.image}" alt="related product image" class="img-thumbnail" style="max-width:25em">
  </div>
    `
    }
}

function setProductID(id) {
    localStorage.setItem("productID", id);
    window.location = "product-info.html"
}

function showComments(comments) {
    if (comments.length > 0) {
        thereComments = true;
        for (comment of comments) {
            let stars = '';
            for (let i = 1; i <= 5; i++) {
                if (i <= comment.score) {
                    stars += '<i class="fas fa-star checked"></i>';
                } else {
                    stars += '<i class="far fa-star"></i>';
                }
            }
            document.getElementById("comments").innerHTML += `
<div class="col-12 row list-group-item">
    <div class="col">
    <div class="d-flex w-100 justify-content-between" >
      <div class="d-flex w-50 justify-content-between" style="text-align: center;">
        <h4>${comment.user}</h4>
        <h4>${stars}</h4>
      </div>
        <p>${comment.dateTime}</p> 
    </div>
        <h5>${comment.description}</h5> 
    </div>
</div>
        `;
            totalAverage += comment.score;
            totalAverageCount++;
        }
    } else {
        thereComments = false;
        document.getElementById("comments").innerHTML += `
        <div class="col-10 row list-group-item">
            <h4>Aun no hay comentarios para esta publicación</h4> 
        </div>
    `;
    }
    UpdateTotalAverage();
}

function addItemToCart() {
    let count = document.getElementById("count").value;
    if (localStorage.getItem("cart").includes(id)) {
        //trae el Cart List del Local Storage
        let cartLS = JSON.parse(localStorage.getItem("cart"));
        //filtra el producto actual segun su id
        let product = cartLS.filter(p => p.id == id);
        //asignamos el valor de producto a su objeto
        product = product[0];
        //cambia la propiedad de product count por el valor del input
         product.count = count;
         //filtra la lista quitando el objeto id
         cartLS = cartLS.filter(p => p.id != id);
        //agrega  el producto con el nuevo valor a la lista
        cartLS.push(product);
        //crea una nueva lista modificada
        localStorage.setItem("cart", JSON.stringify(cartLS));
        //actualiza el contador de items en el carrito
        checkCart()
        //document.getElementById("count").value = product[0].count;
    } else {

        let product = {
            "id": id,
            "name": pname,
            "count": count,
            "unitCost": unitCost,
            "currency": currency,
            "image": image
        };
        let string = JSON.parse(localStorage.getItem("cart"));
        string.push(product);
        localStorage.setItem("cart", JSON.stringify(string));
        checkCart()
    }
}

function addComment() {
    if (thereComments == false) {
        document.getElementById("comments").innerHTML = "";
        thereComments = true;
    }
    //Comentario
    let comment = document.getElementById("comment").value;
    //Puntuacion
    let iStars = '';
    for (let i = 1; i <= 5; i++) {
        if (i <= rateCommentStars) {
            iStars += '<i class="fas fa-star checked"></i>';
        } else {
            iStars += '<i class="far fa-star"></i>';
        }
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
    if (day < 10) {
        day = "0" + day;
    }
    if (hour < 10) {
        hour = "0" + hour;
    }
    if (minutes < 10) {
        minutes = "0" + minutes;
    }
    if (seconds < 10) {
        seconds = "0" + seconds;
    }
    let actualDate = (`${year}-${month}-${day} ${hour}:${minutes}:${seconds}`);

    document.getElementById("comments").innerHTML += `
<div class="col-12 row list-group-item">
    <div class="col">
      <div class="d-flex w-100 justify-content-between">
         <div class="d-flex w-50 justify-content-between" style="text-align: center;">
           <h4>${localStorage.getItem("username")}</h4>
           <h4>${iStars}</h4>     
         </div>
         <p>${actualDate}</p> 
       </div>
       <h5>${comment}</h5> 
    </div>
</div>
        `;
    totalAverage += rateCommentStars;
    totalAverageCount++;
    UpdateTotalAverage();
}

function comentPuntuation(value) {
    rateCommentStars = value;
    if (value < 2) {
        rate2.classList.add("far");
        rate2.classList.remove("checked", "fas");
    } else {
        rate2.classList.add("checked", "fas");
    }
    if (value < 3) {
        rate3.classList.add("far");
        rate3.classList.remove("checked", "fas");
    } else {
        rate3.classList.add("checked", "fas");
    }
    if (value < 4) {
        rate4.classList.add("far");
        rate4.classList.remove("checked", "fas");
    } else {
        rate4.classList.add("checked", "fas");
    }
    if (value < 5) {
        rate5.classList.add("far");
        rate5.classList.remove("checked", "fas");
    } else {
        rate5.classList.add("checked", "fas");
    }
}

function UpdateTotalAverage() {
    if (totalAverageCount != 0) {
        let totalScore = totalAverage / totalAverageCount;
        let count = Math.floor(totalScore);
        let stars = '';
        for (let i = 1; i <= 5; i++) {
            if (i <= count) {
                stars += '<i class="fas fa-star checked"></i>';
            } else {
                stars += '<i class="far fa-star"></i>';
            }
        }
        totalScore = totalScore.toString();
        totalScore = totalScore.substring(0, 4);
        document.getElementById("totalAverage").innerHTML = `
<h4>Puntuación ${totalScore} ${stars}</h4>
        `;
    } else {
        document.getElementById("totalAverage").innerHTML = `
        <h4>Puntuación inexistente</h4>
        `;
    }

}