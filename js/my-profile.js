  document.addEventListener("DOMContentLoaded", function (e) {
      //Inicio DOMContentLoaded
      //Boton para Cerrar Sesion
      document.getElementById("closeSesion").addEventListener("click", () => {
          location.href = "login.html";
          localStorage.clear();
      })
      //Fin de DOMContentLoaded
  });