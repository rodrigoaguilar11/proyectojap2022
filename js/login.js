   document.addEventListener("DOMContentLoaded", () => {
       //Inicio del DOMContentLoaded
       localStorage.clear();
       //Boton para logearse
       document.getElementById("loginButton").addEventListener("click", () => {
           login();
       })

       //Fin del DOMContenLoaded
   });

   reirse();
function reirse (){
console.log("jajajaj");
}
   //Funcion para intentar logear
   function login() {
       //informacion de campos
       let username = document.getElementById("username").value;
       let password = document.getElementById("password").value;
       //Parrafos de errores
       let usernameError = document.getElementById("usernameError");
       let passwordError = document.getElementById("passwordError");
       //verificacion de correo
       if (username === "") {
           usernameError.innerHTML = "Ingresa tu e-mail";
       } else {
           usernameError.innerHTML = "";
       }
       //verificacion de contraseña
       if (password === "") {
           passwordError.innerHTML = "Ingresa tu contraseña";
       } else {
           passwordError.innerHTML = "";
       }
       //verificacion general
       if (username !== "" && password !== "") {
           localStorage.setItem("username", username);
           localStorage.setItem("password", password);
           location.href = "/index.html";
       }
   }

   //localStorage.clear;
   //sessionStorage.clear;
   //localStorage.removeItem("user");