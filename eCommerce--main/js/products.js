var currentProductsArray = [];
var minPrice = "";
var maxPrice = "";
var array = [];
var criterio = "asc";

function showProducts(array) {
  let htmlContentToAppend = "";
  for (let i = 0; i < array.length; i++) {
    let product = array[i];
    // se cambio todo a plantillas literales
    htmlContentToAppend += `
      <a href = "product-info.html" class = "list-group-item list-group-item-action">
        <div class="row">
           <div class="col-3">
               <img src=${product.imgSrc} alt=${product.description} class="img-thumbnail">
            </div>
            <div class="col">
               <div class="d-flex w-100 justify-content-between">
                    <h4 class="mb-1">${product.name}</h4>  
        </div>
             <p class="mb-1">${product.description}</p>
          <p class="mb-1">${product.cost} ${product.currency}</p>
       <p class="mb-1">vendidos: ${product.soldCount}</p>
            </div>
        </div>
  </a>
  `;

    document.getElementById("autos").innerHTML = htmlContentToAppend;
  }
}
/* funcion para filtrar los precios segun los datos que digite el usuario, dato curioso para Nicolas, la pase horrible
 investigando que tipo de datos devolvia el input type=number. 
 al final descubri que en caso de estar vacio el campo, devuelve un string vacio */

function filterPrice(array, min, max) {
  var resultado = [];
  for (i = 0; i < array.length; i++) {
    let product = array[i];

    if (min !== "" && max !== "") {
      //se filtra por minimo y maximo
      if (parseInt(min) <= product.cost && product.cost <= parseInt(max)) {
        resultado.push(product);
      }
    } else if (max === "" && min !== "") {
      // solo se filtra por minimo
      if (parseInt(min) <= product.cost) {
        resultado.push(product);
      }
    } else if (min === "" && max !== "") {
      // solo se filtra por maximo
      if (product.cost <= parseInt(max)) {
        resultado.push(product);
      }
    }
  }
  return resultado;
}

//funcion para ordenar y mostrar los productos
function sortProducts(criteria, currentProductsArray) {
  if (criteria === "asc") {
    currentProductsArray.sort(function (a, b) {
      return a.cost - b.cost;
    });
  } else if (criteria === "desc") {
    currentProductsArray.sort(function (a, b) {
      return b.cost - a.cost;
    });
  } else if (criteria === "sold") {
    currentProductsArray.sort(function (a, b) {
      return b.soldCount - a.soldCount;
    });
  }
  showProducts(currentProductsArray);
}

document.addEventListener("DOMContentLoaded", function (e) {
  array = getJSONData(PRODUCTS_URL).then(function (resultObj) {
    if (resultObj.status === "ok") {
      array = resultObj.data;
      currentProductsArray = array;
      // ordeno y muestro de forma asc por precio
      sortProducts("asc", currentProductsArray);
      return array;
    }
  });

  currentProductsArray = array;
  document
    .getElementById("sortAscPrice")
    .addEventListener("click", function () {
      sortProducts("asc", currentProductsArray);
      criterio = "asc";
    });

  document
    .getElementById("sortDescPrice")
    .addEventListener("click", function () {
      sortProducts("desc", currentProductsArray);
      criterio = "desc";
    });

  document.getElementById("sortBySold").addEventListener("click", function () {
    sortProducts("sold", currentProductsArray);
    criterio = "sold";
  });

  //luego de aplicar el filtro de precios debo de repetir el codigo para que funcione los filtos unidos al filtro de precios
  //de momento no encontre una manera de hacerlo con menos codigo

  document
    .getElementById("rangeFilterPrice")
    .addEventListener("click", function () {
      minPrice = document.getElementById("rangeFilterPriceMin").value;
      maxPrice = document.getElementById("rangeFilterPriceMax").value;

      currentProductsArray = filterPrice(array, minPrice, maxPrice);

      sortProducts(criterio, currentProductsArray);

      document
        .getElementById("sortAscPrice")
        .addEventListener("click", function () {
          sortProducts("asc", currentProductsArray);
          criterio = "asc";
        });

      document
        .getElementById("sortDescPrice")
        .addEventListener("click", function () {
          sortProducts("desc", currentProductsArray);
          criterio = "desc";
        });

      document
        .getElementById("sortBySold")
        .addEventListener("click", function () {
          sortProducts("sold", currentProductsArray);
          criterio = "sold";
        });
    });

  document
    .getElementById("clearRangeFilterPrice")
    .addEventListener("click", function () {
      currentProductsArray = array;
      minPrice = "";
      maxPrice = "";
      document.getElementById("rangeFilterPriceMin").value = "";
      document.getElementById("rangeFilterPriceMax").value = "";

      sortProducts(criterio, currentProductsArray);
      criterio = "asc";
    });

  console.log(criterio);
});
