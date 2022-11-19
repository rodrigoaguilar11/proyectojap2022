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
  } else {
    document.getElementById("profilePhoto").src = "../proyectojap2022/img/img_perfil.png";
  }
  //mostramos la imagen al cargarla
  document.getElementById("inputProfilePhoto").addEventListener("change", (e) => {
    imageLoaded = e.target.files[0];
    document.getElementById("profilePhoto").src = URL.createObjectURL(imageLoaded);
  })

  let form = document.getElementById("purchaseForm")
  form.addEventListener('submit', function (event) {
    if (form.checkValidity()) {
     savePersonalData()
      event.preventDefault()
      event.stopPropagation() 
    } else {
       event.preventDefault()
      event.stopPropagation()
    }
    form.classList.add('was-validated')
  }, false)

  let passForm = document.getElementById("passForm")
  passForm.addEventListener('submit', function (event) {
    let pass1 = document.getElementById("password1").value;
    let pass2 = document.getElementById("password2").value;
    if (passForm.checkValidity() && pass1 == localStorage.getItem("password") && pass2 == pass1) {
      localStorage.setItem("password", document.getElementById("newPassword").value);
      Swal.fire({
        title: 'Contraseña Cambiada',
        text: 'Su contraseña fue actualizada con éxito.',
        icon: 'success',
        confirmButtonText: 'Aceptar'
      })
      event.preventDefault()
      event.stopPropagation()
    } else if (passForm.checkValidity()&& localStorage.getItem("password") == undefined){
      localStorage.setItem("password", document.getElementById("newPassword").value);
      Swal.fire({
        title: 'Contraseña Creada',
        text: 'La contraseña fue creada',
        icon: 'info',
        confirmButtonText: 'Aceptar'
      })
      event.preventDefault()
      event.stopPropagation()
    }else {
      Swal.fire({
        title: 'Contraseña Incorrecta',
        text: 'Verifique que los campos sean correctos.',
        icon: 'error',
        confirmButtonText: 'Aceptar'
      })
      event.preventDefault()
      event.stopPropagation()

    }
    passForm.classList.add('was-validated')
  }, false)

  //Fin de DOMContentLoaded
});

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
      document.getElementById("navProfileImg").src = URL.createObjectURL(imageLoaded);
      let name = JSON.parse(localStorage.getItem("personalData"));
      document.getElementById("profileName").innerHTML = name.firstName + " " + name.lastname;
    }
  } else {
    localStorage.setItem("personalData", JSON.stringify(personalDataToAdd));
    document.getElementById("alert-success").classList.add("show");
    let name = JSON.parse(localStorage.getItem("personalData"));
    document.getElementById("profileName").innerHTML = name.firstName + " " + name.lastname;
  }
}

function deleteDates() {
  localStorage.removeItem("personalData");
  location.href = "my-profile.html";
}

function deleteImg() {
  const personalData = JSON.parse(localStorage.getItem("personalData"))
  personalData.profilePhoto = "../proyectojap2022/img/img_perfil.png";
  localStorage.setItem("personalData", JSON.stringify(personalData));
  location.href = "my-profile.html";
}

function showPassword() {
  let pass1 = document.getElementById("password1");
  let pass2 = document.getElementById("password2");
  let newPass = document.getElementById("newPassword");
  if (pass1.type == "password") {
    pass1.type = "text";
    pass2.type = "text";
    newPass.type = "text";
  } else {
    pass1.type = "password";
    pass2.type = "password";
    newPass.type = "password";
  }
}