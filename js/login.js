   document.addEventListener("DOMContentLoaded", () => {
       //Inicio del DOMContentLoaded
(function () {
    'use strict'
      var forms = document.querySelectorAll('.needs-validation')
    Array.prototype.slice.call(forms)
      .forEach(function (form) {
        form.addEventListener('submit', function (event) {
          if (!form.checkValidity()) {
            event.preventDefault()
            event.stopPropagation()
          }else {
            localStorage.setItem("password", password.value);
            localStorage.setItem("email", username.value);
            location.href = "home.html";
            event.preventDefault()
            event.stopPropagation()
          }
          form.classList.add('was-validated')
        }, false)
      })
  })()
       //Fin del DOMContenLoaded
   });

   function showPassword(){
   let passInput = document.getElementById("password");
   if(passInput.type=="password"){
passInput.type="text";
document.getElementById("showPasswordText").textContent="Ocultar Contraseña ";
   }else{
    passInput.type="password";
    document.getElementById("showPasswordText").textContent="Mostrar Contraseña ";
   }
}

//Google Oauth

const parseJwt = (token) => {
  var base64Url = token.split('.')[1];
  var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  var jsonPayload =
  decodeURIComponent(window.atob(base64).split('').map(function(c) {
  return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));
  return JSON.parse(jsonPayload);
  }
  
  function handleCredentialResponse(response) {
    localStorage.setItem("email", parseJwt(response.credential).email)
    window.location.href = "home.html"
    }
    window.onload = function () {
    google.accounts.id.initialize({
    client_id: "518606529706-6v48q9k3l67p3mvgvnm1b5n8fj73r14k.apps.googleusercontent.com",
    callback: handleCredentialResponse
    });
    google.accounts.id.renderButton(
    document.getElementById("buttonDiv"),
    { theme: "outline", size: "large" }
    );
    google.accounts.id.prompt();
    }
    