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
// cosas aparte__________________________________________
let auth2; // The Sign-In object.
let googleUser; // The current user.
let profile;

/**
 * Calls startAuth after Sign in V2 finishes setting up.
 */
const appStart = function() {
  gapi.load('auth2', initSigninV2);
};

function onSignIn(googleUser) {
  $("#signInId").hide();

  // Useful data for your client-side scripts:
  profile = googleUser.getBasicProfile();

  console.log("ID: " + profile.getId()); // Don't send this directly to your server!
  console.log('Full Name: ' + profile.getName());
  console.log('Given Name: ' + profile.getGivenName());
  console.log('Family Name: ' + profile.getFamilyName());
  console.log("Image URL: " + profile.getImageUrl());
  console.log("Email: " + profile.getEmail());
  showSidebarMessage('Welcome ' + profile.getGivenName() + '!');
  showSidebarMessage('Your email ' + profile.getEmail() + '!');

  // The ID token you need to pass to your backend:
  const id_token = googleUser.getAuthResponse().id_token;
  console.log("ID Token: " + id_token);

  window.location.replace(window.location.origin + '/login?username=' + profile.getEmail());

  $("#signOutId").show();
}

function signOut() {
  $("#signOutId").hide();

  var auth2 = gapi.auth2.getAuthInstance();
  auth2.signOut().then(function() {
    console.log('User signed out.');
  });

  showSidebarMessage('See you!');
  $("#signInId").show();
}

$(document).ready(function() {
  console.log('ready');
  console.log(googleUser);
  if (googleUser && googleUser.isSignedIn()) {
    showSidebarMessage('Welcome Back!' + profile?profile.getEmail():'');
    $("#signInId").hide();
    $("#signOutId").show();
  } else {
    showSidebarMessage('Welcome Guest!');
    $("#signInId").show();
    $("#signOutId").hide();
  }
});