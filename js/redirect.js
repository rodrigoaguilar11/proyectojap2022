document.addEventListener("DOMContentLoaded", function () {
if (localStorage.getItem("username")==undefined || localStorage.getItem("password")==undefined) {
    location.href = "login.html";
} else {
    location.href = "home.html"
}
});

