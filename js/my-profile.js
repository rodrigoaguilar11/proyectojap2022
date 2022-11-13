let imageLoaded;

const toBase64 = file => new Promise((resolve, reject) => {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => resolve(reader.result);
  reader.onerror = error => reject(error);
});

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

  //Password Settings
  document.getElementById("changePassword").addEventListener("click", () => {
    if (localStorage.getItem("password") == document.getElementById("password1").value && document.getElementById("password2").value == document.getElementById("password1").value) {
      localStorage.setItem("password", document.getElementById("newPassword").value);
      location.href = "my-profile.html";
    } else {
      alert("contraseña incorrecta");
    }
  })
  document.getElementById("my-profile-title").innerHTML += 'Configuracion de perfil de ' + localStorage.getItem("email");

  //Direction Settings
  if (localStorage.getItem("direction") != null) {
    let direction = JSON.parse(localStorage.getItem("direction"));
    document.getElementById("directionToSend").value = direction.direction;
    document.getElementById("directionStreet").value = direction.street;
    document.getElementById("directionNumber").value = direction.number;
  }

  document.getElementById("aceptDirection").addEventListener("click", () => {
    let directionToAdd = {
      "direction": document.getElementById("directionToSend").value,
      "street": document.getElementById("directionStreet").value,
      "number": document.getElementById("directionNumber").value
    };
    localStorage.setItem("direction", JSON.stringify(directionToAdd));
    document.getElementById("alert-success").classList.add("show");
  })

  //Change Wallpaper Settings
  document.getElementById("changeWallpaper").addEventListener("click", () => {
    localStorage.setItem("wallpaper", document.getElementById("wallpapers").value);
    location.href = "my-profile.html";
  })
  //Get e-mail
  document.getElementById("email").value = localStorage.getItem("email");
  //Get personal Data in localStorage
  if (localStorage.getItem("personalData") != null) {
    let personalData = JSON.parse(localStorage.getItem("personalData"));
    document.getElementById("firstName").value = personalData.firstName;
    document.getElementById("secondName").value = personalData.secondName;
    document.getElementById("lastname").value = personalData.lastname;
    document.getElementById("secondLastname").value = personalData.secondLastname;
    document.getElementById("phoneNumber").value = personalData.phoneNumber;
    document.getElementById("profilePhoto").src = personalData.profilePhoto;
  }else{
    document.getElementById("profilePhoto").src = "../proyectojap2022/img/img_perfil.png";
  }
  //mostramos la imagen al cargarla
  document.getElementById("inputProfilePhoto").addEventListener("change", (e) => {
    imageLoaded = e.target.files[0];
    document.getElementById("profilePhoto").src = URL.createObjectURL(e.target.files[0]);
  })

  //Fin de DOMContentLoaded
});

(function () {
  'use strict'
  var forms = document.querySelectorAll('.needs-validation')
  Array.prototype.slice.call(forms)
    .forEach(function (form) {
      form.addEventListener('submit', function (event) {

        if (!form.checkValidity()) {
          event.preventDefault()
          event.stopPropagation()
        } else {
          savePersonalData()
          event.preventDefault()
          event.stopPropagation()
        }
        form.classList.add('was-validated')

      }, false)
    })
})()

function savePersonalData() {
  let personalDataToAdd = {
    "firstName": document.getElementById("firstName").value,
    "secondName": document.getElementById("secondName").value,
    "lastname": document.getElementById("lastname").value,
    "secondLastname": document.getElementById("secondLastname").value,
    "phoneNumber": document.getElementById("phoneNumber").value,
    "profilePhoto": "../proyectojap2022/img/img_perfil.png"
  };
    localStorage.setItem("email", document.getElementById("email").value);
  //Si hay una imagen cargada la agregamos al objeto
  if (document.getElementById("inputProfilePhoto").files.length != 0) {
    parseImage();
    async function parseImage() {
      //console.log(await toBase64(imageLoaded));
      let imageParsed = await toBase64(imageLoaded);
      personalDataToAdd.profilePhoto = imageParsed;
      localStorage.setItem("personalData", JSON.stringify(personalDataToAdd));
      document.getElementById("alert-success").classList.add("show");
    }
  } else {
    localStorage.setItem("personalData", JSON.stringify(personalDataToAdd));
    document.getElementById("alert-success").classList.add("show");
  }
}

function deleteDates() {
  localStorage.removeItem("personalData");
  location.href = "my-profile.html";
}

function deleteImg(){
  const personalData = JSON.parse(localStorage.getItem("personalData"))
  personalData.profilePhoto = "../proyectojap2022/img/img_perfil.png";
  localStorage.setItem("personalData", JSON.stringify(personalData));
  location.href = "my-profile.html";
}