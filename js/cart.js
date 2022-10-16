let cartURL = CART_INFO_URL + "25801" + EXT_TYPE;
let cart = document.getElementById("cart");

document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(cartURL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            showCartList(resultObj.data.articles);
        }
    });
    let cartLocalStorage = JSON.parse(localStorage.getItem("cart"));
    showCartList(cartLocalStorage);

    //Agrega delegacion de eventos a los INPUT en el Tbody
    cart.addEventListener("input", (e) => {
        if (e.target.tagName === "INPUT") {
            document.getElementById("sub-" + e.target.id).innerHTML =
                `${document.getElementById("cost-" + e.target.id).outerText * e.target.value}`;
        }
    })

    if (localStorage.getItem("direction") != null) {
        let direction = JSON.parse(localStorage.getItem("direction"));
        document.getElementById("directionToSend").value = direction.direction;
        document.getElementById("directionStreet").value = direction.street;
        document.getElementById("directionNumber").value = direction.number;
    }
    //End of DOMContentLoaded
});

function showCartList(products) {
    for (product of products) {
        cart.innerHTML += `
      <tr>
        <td>
            <img src=${product.image} style="max-width:5em">
        </td>
        <td>
            <p>${product.name}</p>
        </td>
        <td>
            <p>${product.currency} <label id="cost-${product.id}">${product.unitCost}</label></p>
        </td>
        <td>
            <input id="${product.id}" class="form-control" type="number" id="count" value="${product.count}" style="max-width:5em; display:inline;" min="0"></td>
        <th>
        <p>${product.currency} <label id="sub-${product.id}"></label></p>
        </th>
      </tr>
        `;
        let subID = "sub-" + product.id;
        let unitCost = product.unitCost;
        let inputID = product.id;

        document.getElementById(subID).innerHTML = (unitCost * parseInt(document.getElementById(inputID).value));
    }
}

function clearCart() {
    localStorage.setItem("cart", JSON.stringify([]));
    location.href = "cart.html";
}