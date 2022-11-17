let cartURL = CART_INFO_URL + "25801" + EXT_TYPE;
let cart = document.getElementById("cart");
let cartLocalStorage = JSON.parse(localStorage.getItem("cart"));
let message;
document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(cartURL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            showCartList(resultObj.data.articles);
        }
    });
    showCartList(cartLocalStorage);

    //Agrega delegacion de eventos a los INPUT en el Tbody
    cart.addEventListener("input", (e) => {
        if (e.target.tagName === "INPUT") {
            let sub = document.getElementById("cost-" + e.target.id).outerText;
            let currency = sub.substring(0, 3);
            let cost = sub.substring(3, Infinity);
            //console.log("cost: " + cost);
            //console.log("currency: " + currency);
            document.getElementById("sub-" + e.target.id).innerHTML = `${currency} ${cost * e.target.value}`;
            calcTotal()
        }
    })
    //asignamos los valores de direccion desde el localStorage si estan disponibles
    if (localStorage.getItem("direction") != null) {
        let direction = JSON.parse(localStorage.getItem("direction"));
        document.getElementById("directionToSend").value = direction.direction;
        document.getElementById("directionStreet").value = direction.street;
        document.getElementById("directionNumber").value = direction.number;
    }

    let cardNumber = document.getElementById("card-number"),
        cardSecureCode = document.getElementById("card-secureCode"),
        cardExpiration = document.getElementById("card-expiration"),
        accountNumber = document.getElementById("account-number");


    document.getElementById("creditTarget").addEventListener("click", () => {
        cardNumber.removeAttribute("disabled")
        cardSecureCode.removeAttribute("disabled")
        cardExpiration.removeAttribute("disabled")
        document.getElementById("formPayment").innerText = "Tarjeta de credito";

        if (accountNumber.getAttribute("disabled") === null) {
            accountNumber.setAttribute("disabled", "")
        }

    })
    document.getElementById("bankTransfer").addEventListener("click", () => {
        //en caso de que los inputs de tarjeta de credito no tengan disabled se le agrega
        accountNumber.removeAttribute("disabled")
        document.getElementById("formPayment").innerText = "Transferencia bancaria";

        if (cardNumber.getAttribute("disabled") === null) {
            cardNumber.setAttribute("disabled", "")
            cardSecureCode.setAttribute("disabled", "")
            cardExpiration.setAttribute("disabled", "")
        }

    })
   
    getJSONData(CART_BUY_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            message = resultObj.data.msg;
        }
    })

    //End of DOMContentLoaded
});

function showCartList(products) {
    for (product of products) {
        cart.innerHTML += `
      <tr id="tr-${product.id}">
        <td>
            <img src=${product.image} style="max-width:5em">
        </td>
        <td>
            <p>${product.name}</p>
        </td>
        <td>
            <p id="cost-${product.id}">${product.currency} ${product.unitCost}</p>
        </td>
        <td>
            <input id="${product.id}" class="form-control" type="number" id="count" value="${product.count}" style="max-width:5em; display:inline;" min="0" required></td>
        <th>
        <p class="subtotal" id="sub-${product.id}"></p>
        </th>
        <th>
        <button class="btn btn-danger" style="background-color:white;" onclick="deleteProduct(${product.id})">
        <svg style="color:red" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
        <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
        </svg>
      </button>    
      </th>
      </tr>
        `;
        let subID = "sub-" + product.id;
        let inputID = product.id;
        let cost = product.unitCost * parseInt(document.getElementById(inputID).value);
        let productCurrency = product.currency;
        document.getElementById(subID).innerHTML = (productCurrency + " " + cost);
    }
    calcTotal();
}

function clearCart() {
    localStorage.setItem("cart", JSON.stringify([]));
    location.href = "cart.html";
}

function deleteProduct(id) {
    document.getElementById("tr-" + id).remove();
    cartLocalStorage = cartLocalStorage.filter(p => p.id != id);
    localStorage.setItem("cart", JSON.stringify(cartLocalStorage));
    calcTotal();
}

function calcTotal() {
    let total = 0,
        subtotals = document.querySelectorAll('.subtotal');
    subtotals.forEach(e => total += verifyCurrency(e.outerText));
    document.getElementById("subtotal").innerText = "USD " + total;
    //console.log("total: " + total)
    let percentage = parseFloat(document.querySelector('input[name="purchaseType"]:checked').value)
    document.getElementById("sendCost").innerText = "USD " + parseInt(total * percentage);
    //console.log(percentage)
    document.getElementById("totalCost").innerText = "USD " + (total + parseInt(total * percentage));
}

function verifyCurrency(value) {
    let currency = value.substring(0, 3);
    let price = value.substring(3, Infinity);
    //console.log("price: " + price)
    //console.log("currency: " + currency)

    if (currency === "UYU") {
        return parseInt(price / 40)
    } else {
        return parseInt(price)
    }
}

(function () {
    'use strict'
    var forms = document.querySelectorAll('.needs-validation')
    Array.prototype.slice.call(forms)
        .forEach(function (form) {
            //Evento para cada vez que se ejecuta submit
            form.addEventListener('submit', function (event) {

                if (!(document.getElementById("creditTarget").checkValidity() || document.getElementById("bankTransfer").checkValidity())) {
                    document.getElementById("metodError").innerHTML = "Debe seleccionar una forma de pago";
                } else if (!document.getElementById("card-number").checkValidity() || !document.getElementById("card-secureCode").checkValidity() || !document.getElementById("card-expiration").checkValidity() || !document.getElementById("account-number").checkValidity()) {
                    document.getElementById("metodError").innerHTML = "Faltan rellenar campos";
                } else {
                    document.getElementById("metodError").innerHTML = "";
                }
                //va a retornar true si el formulario esta incompleto
                if (!form.checkValidity()) {
                    //cancela el evento si es cancelable
                    event.preventDefault()
                    //evita una mayor propagacion del evento actual
                    event.stopPropagation()
                } else {
                    showAlertSuccess()
                    event.preventDefault()
                    event.stopPropagation()
                }
                form.classList.add('was-validated')
            }, false)
        })
})()

function showAlertSuccess() {


    Swal.fire({
        title: message,
        text: 'Su compra fue realizada con éxito.',
        icon: 'success',
        confirmButtonText: 'Aceptar'
    })
}