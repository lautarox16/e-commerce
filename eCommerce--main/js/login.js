//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
const login = () => {
  // verifico que el usuario y contraseña no esten vacios
  if (
    document.getElementById("usuario").value &&
    document.getElementById("contraseña").value
  ) {
    sessionStorage.setItem("logueado", true);
    sessionStorage.setItem("user", document.getElementById("usuario").value);

    window.location = "index.html";
  } else {
    alert("Usuario y contraseña no deben ser vacíos");
  }
};

document.addEventListener("DOMContentLoaded", function (e) {
  document.getElementById("log").addEventListener("click", login);
});
