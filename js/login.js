   document.addEventListener("DOMContentLoaded", () => {
       //Inicio del DOMContentLoaded
       //Boton para logearse
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
           localStorage.setItem("password", password.value);
           localStorage.setItem("username", username.value);
           location.href = "home.html";
       }
   }

   //Google Oauth
   function onGoogleSignIn(googleUser) {
       alert("onGoogleSignIn called");
       let perfil = googleUser.name;
       let gProfile = googleUser.getBasicProfile();
       let gName = gProfile.getName();
       localStorage.setItem("username",gName);
       localStorage.setItem("password", ".");
       location.href = "home.html";
   }

   function onGoogleSignInFailure(res) {
       console.error('onFail', res);
   }

   //TEST

   function handleCredentialResponse(response) {
    // decodeJwtResponse() is a custom function defined by you
    // to decode the credential response.

    console.log("ID: " + response.sub);
    console.log('Full Name: ' + response.name);
    console.log('Given Name: ' + response.given_name);
    console.log('Family Name: ' + response.family_name);
    console.log("Image URL: " + response.picture);
    console.log("Email: " + response.email);
 }
 function decodeJwtResponse(){
    alert("Invalid");
 }