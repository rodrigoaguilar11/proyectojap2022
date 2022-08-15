   document.addEventListener("DOMContentLoaded", () => {
       //Inicio del DOMContentLoaded
2-       //Boton para logearse
       document.getElementById("loginButton").addEventListener("click", () => {
           login();
       })

       //Fin del DOMContenLoaded
   });

   //Funcion para intentar logear
   function login() {
       //informacion de campos
       let username = document.getElementById("username");
       let password = document.getElementById("password");
       //Parrafos de errores
       let usernameError = document.getElementById("usernameError");
       let passwordError = document.getElementById("passwordError");
       //verificacion de correo
       if (username.value === "") {
           username.classList.add('is-invalid');
           usernameError.innerHTML = "Ingresa tu e-mail";
       } else {
           username.classList.remove('is-invalid');
           usernameError.innerHTML = "";
       }
       //verificacion de contraseña
       if (password.value === "") {
           password.classList.add('is-invalid');
           passwordError.innerHTML = "Ingresa tu contraseña";
       } else {
           password.classList.remove('is-invalid');
           passwordError.innerHTML = "";
       }
       //verificacion general
       if (username.value !== "" && password.value !== "") {
           localStorage.setItem("username", username.value);
           localStorage.setItem("password", password.value);
           location.href = "index.html";
       }
   }

   //localStorage.clear;
   //sessionStorage.clear;
   //localStorage.removeItem("user");