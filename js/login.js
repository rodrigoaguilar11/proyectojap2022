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
    let responsePayload = decodeJwt(response.credential);
    responsePayload = (jwt_decode(responsePayload));

    console.log("ID: " + responsePayload.sub);
    console.log('Full Name: ' + responsePayload.name);
    console.log('Given Name: ' + responsePayload.given_name);
    console.log('Family Name: ' + responsePayload.family_name);
    console.log("Image URL: " + responsePayload.picture);
    console.log("Email: " + responsePayload.email);
 }

 module.exports = {   decodeJwt: function (token) {
    var segments = token.split('.');
    if (segments.length !== 3) {
    throw new Error('Not enough or too many segments');
    }
    // All segment should be base64
    var headerSeg = segments[0];
    var payloadSeg = segments[1];
    var signatureSeg = segments[2];
    // base64 decode and parse JSON
    var header = JSON.parse(base64urlDecode(headerSeg));
    var payload = JSON.parse(base64urlDecode(payloadSeg));
    return {
    header: header,
    payload: payload,
    signature: signatureSeg
    }    } }  
    function base64urlDecode(str) {   return new Buffer(base64urlUnescape(str), 'base64').toString();
    };
     function base64urlUnescape(str) {   str += Array(5 - str.length % 4).join('=');
      return str.replace(/\-/g, '+').replace(/_/g, '/');
    } 