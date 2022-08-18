   document.addEventListener("DOMContentLoaded", () => {
       //Inicio del DOMContentLoaded
2-       //Boton para logearse
       document.getElementById("loginButton").addEventListener("click", () => {
           login();
       })

       //Fin del DOMContenLoaded
   });
//login google
// Credenciales de cliente
let client_id = '518606529706-ffieeft9dm0b57bflr1dbkp6ip2v9rn8.apps.googleusercontent.com';
let client_secret = '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';


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
   function onSignIn(googleUser) {
    // Useful data for your client-side scripts:
    let usuario_google = googleUser.getBasicProfile();
    console.log("ID: " + usuario_google.getId()); // Don't send this directly to your server!
    console.log('Full Name: ' + usuario_google.getName());
    console.log('Given Name: ' + usuario_google.getGivenName());
    console.log('Family Name: ' + usuario_google.getFamilyName());
    console.log("Image URL: " + usuario_google.getImageUrl());
    console.log("Email: " + usuario_google.getEmail());
  }
 function logout() {
    this.ref.unauth();
    console.log('Logout button clicked');
}