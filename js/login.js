   document.addEventListener("DOMContentLoaded", () => {
       //Inicio del DOMContentLoaded
       //Boton para logearse
       document.getElementById("loginButton").addEventListener("click", () => {
           login();
       })

       username.addEventListener("keydown", githubEnterDetect);
function githubEnterDetect(e) {
    switch (e.key) {
        case "Enter":
            login();
            break;
    }
}
password.addEventListener("keydown", githubEnterDetect);
function githubEnterDetect(e) {
    switch (e.key) {
        case "Enter":
            login();
            break;
    }
}
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

   function showPassword(){
   let passInput = document.getElementById("password");
   if(passInput.type=="password"){
passInput.type="text";
   }else{
    passInput.type="password";
   }
}

   //TEST
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

   function handleCredentialResponse(response) {
    // decodeJwtResponse() is a custom function defined by you
    // to decode the credential response.
    let responsePayload = parseJwt(response.credential);
    responsePayload = (decodeJwt(responsePayload));

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

    function parseJwt(token) {
        var base64Url = token.split(".")[1];
        var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
        var jsonPayload = decodeURIComponent(
          window
            .atob(base64)
            .split("")
            .map(function (c) {
              return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
            })
            .join("")
        );
        return JSON.parse(jsonPayload);
      }