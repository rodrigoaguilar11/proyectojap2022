   document.addEventListener("DOMContentLoaded", () => {
       //Inicio del DOMContentLoaded
       //Boton para logearse
       localStorage.clear();
       document.getElementById("loginButton").addEventListener("click", () => {
        login();
       })
       
       //Fin del DOMContenLoaded
   });



   //validacion de usuario ingresado


   /*
       document.getElementById("loginButton").addEventListener("click"), () => {
           alert("aa");
      
       if (localStorage.setItem("user") === null) {
           location.href = "login.html";
       } };
*/
   function login() {
       let username = document.getElementById("username").value;
       let password = document.getElementById("password").value;
       if (username === "") {
           document.getElementById("usernameError").innerHTML = "Ingrese Usuario";
       } else if (password === "") {
           document.getElementById("passwordError").innerHTML = "Ingrese Contraseña";
       } else {
           localStorage.setItem("username", username);
           localStorage.setItem("password", password);
           location.href = "/index.html";
       }
   }

   //localStorage.clear;
   //sessionStorage.clear;
   //localStorage.removeItem("user");