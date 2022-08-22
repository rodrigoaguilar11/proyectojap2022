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

    //Fin de DOMContentLoaded
});

if (localStorage.getItem("username")==undefined || localStorage.getItem("password")==undefined) {
    location.href = "login.html";
} else {
    location.href = "home.html"
}
