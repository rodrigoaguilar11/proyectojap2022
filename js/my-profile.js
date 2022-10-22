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
    //Username Settings
    document.getElementById("changeName").addEventListener("click", () => {
      if (localStorage.getItem("password") == document.getElementById("password").value) {
        localStorage.setItem("username", document.getElementById("username").value);
        location.href = "my-profile.html";
      } else {
        alert("contraseña incorrecta");
      }
    })
    //Password Settings
    document.getElementById("changePassword").addEventListener("click", () => {
      if (localStorage.getItem("password") == document.getElementById("password1").value && document.getElementById("password2").value == document.getElementById("password1").value) {
        localStorage.setItem("password", document.getElementById("newPassword").value);
        location.href = "my-profile.html";
      } else {
        alert("contraseña incorrecta");
      }
    })
    document.getElementById("my-profile-title").innerHTML += 'Configuracion de perfil de ' + localStorage.getItem("username");

    //Direction Settings



    document.getElementById("aceptDirection").addEventListener("click", () => {
      let directionToAdd = {
        "direction": document.getElementById("directionToSend").value,
        "street": document.getElementById("directionStreet").value,
        "number": document.getElementById("directionNumber").value
      };
      localStorage.setItem("direction", JSON.stringify(directionToAdd));
    })
    if (localStorage.getItem("direction") != null) {
    let direction = JSON.parse(localStorage.getItem("direction"));
    document.getElementById("directionToSend").value = direction.direction;
    document.getElementById("directionStreet").value = direction.street;
    document.getElementById("directionNumber").value = direction.number;
    }
    //Fin de DOMContentLoaded
  });