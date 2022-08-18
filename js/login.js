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
    var profile = googleUser.getBasicProfile();//Obtiene perfil de usuario básico.
    var perfil="<h2> Perfil del usuario </h2><div class='row'> ";
    perfil+="<div class='col-1'><img src=" + profile.getImageUrl() +"></div> " +
     "<div class='col-12'> ID:"+ profile.getId() +
      "</div>" + "<div class='col-sm'> Nombre: " + profile.getName() +
      "</div> <div class='col-sm'> Email: "+ profile.getEmail() + "</div> </div>";

    document.getElementById('datos').innerHTML=perfil;
    alert("SE LOGEO");
}
function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      alert("Usuario desconectado");
      location.reload();
      alert("SE CERRO LA SESIONS");

    });
    
  }