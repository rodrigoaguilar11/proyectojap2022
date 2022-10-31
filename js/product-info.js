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

    //counter of texarea input
    let comment = document.getElementById('comment');
    let textAreaCounter = document.getElementById('textAreaCounter');

    comment.addEventListener('input', function (e) {
        const target = e.target;
        const longitudMax = target.getAttribute('maxlength');
        const longitudAct = target.value.length;
        textAreaCounter.innerHTML = `${longitudAct} de ${longitudMax}`;
    });
    document.getElementById("usernameForComment").innerHTML= actualUsername;
    //End of DOMContentLoaded
})

function showProductInfo(array) {
    document.getElementById("productName").innerHTML = array.name;

    let catID = localStorage.getItem("catID");
    let category;

    switch (catID) {
        case "101":
            category = "Autos";
            break
        case "102":
            category = "Juguetes";
            break
        case "103":
            category = "Muebles";
            break
        case "104":
            category = "Herramientas";
            break
        case "105":
            category = "Computadoras";
            break
        case "106":
            category = "Vestimenta";
            break
        case "107":
            category = "Electrodomesticos";
            break
        case "108":
            category = "Deporte";
            break
        case "109":
            category = "Celulares";
            break
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
        <img src="${img}" alt="product image" class="img-thumbnail">
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
  <div onclick="setProductID(${relatedProduct.id})" class="list-group list-group-item-action cursor-active" style="text-align:center; align-items:center">
    <h4>${relatedProduct.name}</h4> 
    <img src="${relatedProduct.image}" alt="related product image" class="img-thumbnail shadow" style="width:50%">
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
        let commentsToAdd = "";
        for (comment of comments) {
            let stars = '';
            for (let i = 1; i <= 5; i++) {
                if (i <= comment.score) {
                    stars += '<i class="fas fa-star checked"></i>';
                } else {
                    stars += '<i class="far fa-star"></i>';
                }
            }
            commentsToAdd += `
<div class="col-12 list-group-item">
    <div class="d-lg-flex d-md-block justify-content-between">
      <h4>${stars}</h4>
      <h4>${comment.user}</h4>
      <p>${comment.dateTime}</p> 
    </div>
    <h5>${comment.description}</h5> 
</div>
        `;
            totalAverage += comment.score;
            totalAverageCount++;
        }
        document.getElementById("comments").innerHTML += commentsToAdd;
    } else {
        thereComments = false;
        document.getElementById("comments").innerHTML += `
        <div class="col-12 list-group-item">
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
<div class="col-12 list-group-item">
    <div class="d-lg-flex d-md-block justify-content-between">
        <h4>${iStars}</h4>     
        <h4>${actualUsername}</h4>
        <p>${actualDate}</p> 
    </div>
    <h5>${comment}</h5> 
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
<h5>Puntuación media de  ${totalScore} ${stars} en ${totalAverageCount} comentarios.</h5>
        `;
    } else {
        document.getElementById("totalAverage").innerHTML = `
        <h5>Puntuación inexistente</h5>
        `;
    }

}