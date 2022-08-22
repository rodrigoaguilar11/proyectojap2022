  document.addEventListener("DOMContentLoaded", function (e) {
      //Inicio DOMContentLoaded
      //Boton para Cerrar Sesion
      document.getElementById("closeSesion").addEventListener("click", () => {
          location.href = "login.html";
          localStorage.clear();

          let auth2 = gapi.auth2.getAuthInstance();
          auth2.signOut().then(function () {
            location.reload();
          });
          
      })
      document.getElementById("my-profile-title").innerHTML +='<span style= font-size:30px; font-weight:bold;>Configuracion de perfil de '+localStorage.getItem("username") +'</span>' ;

      //Fin de DOMContentLoaded
  });
