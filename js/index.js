document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("autos").addEventListener("click", function () {
        localStorage.setItem("catID", 101);
        window.location = "products.html"
    });
    document.getElementById("juguetes").addEventListener("click", function () {
        localStorage.setItem("catID", 102);
        window.location = "products.html"
    });
    document.getElementById("muebles").addEventListener("click", function () {
        localStorage.setItem("catID", 103);
        window.location = "products.html"
    });

    //Boton para Cerrar Sesion
    document.getElementById("closeSesion").addEventListener("click", () => {
        location.href = "/login.html";
        localStorage.clear();
    })
    //Detectar Sesion
    if (localStorage.getItem("username")==undefined || localStorage.getItem("password")==undefined) {
        location.href = "/login.html";
    } else {
        document.getElementById("usernameNav").innerHTML = localStorage.getItem("username");
    }
    //Fin de DOMContentLoaded
});