//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.

var ProductsArray = [];

function showProducts(array) {
  let htmlContentToAppend = "";
  for (let i = 0; i < array.length; i++) {
    let product = array[i];

    htmlContentToAppend +=
      `
      <div class="row">
          <div class="col-3">
              <img src="` +
      product.imgSrc +
      `" alt="` +
      product.description +
      `" class="img-thumbnail">
          </div>
          <div class="col">
              <div class="d-flex w-100 justify-content-between">
                  <h4 class="mb-1">` +
      product.name +
      `</h4>  
      </div>
            <p class="mb-1">` +
      product.description +
      `</p>
        <p class="mb-1">` +
      "precio: " +
      product.cost +
      " " +
      product.currency +
      `</p>
      <p class="mb-1">` +
      "vendidos: " +
      product.soldCount +
      `</p>
          </div>
      </div>
  </a>
  `;

    document.getElementById("contenedor").innerHTML = htmlContentToAppend;
  }
}

document.addEventListener("DOMContentLoaded", function (e) {
  getJSONData(PRODUCTS_URL).then(function (resultObj) {
    if (resultObj.status === "ok") {
      array = resultObj.data;
      //Muestro las categorías ordenadas
      showProducts(array);
    }
  });
});