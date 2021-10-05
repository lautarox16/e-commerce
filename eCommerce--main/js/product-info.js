//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
function showImagesGallery(array) {
  let htmlContentToAppend = "";

  for (let i = 0; i < array.length; i++) {
    let imageSrc = array[i];

    htmlContentToAppend += `
        <div class="col-lg-3 col-md-4 col-6">
            <div class="d-block mb-4 h-100">
                <img class="img-fluid img-thumbnail" src="${imageSrc}" alt="imagen">
            </div>
        </div>
        `;

    document.getElementById("productImagesGallery").innerHTML =
      htmlContentToAppend;
  }
}

function showStars(score) {
  let i = 1;
  let result = ``;
  while (i <= score) {
    result += `<span class="fa fa-star checked"></span>`;
    i++;
  }
  while (i <= 5) {
    result += `<span class="fa fa-star"></span>`;
    i++;
  }
  return result;
}

function showComments(array) {
  let contentToAppend = "";

  for (let i = 0; i < array.length; i++) {
    let comment = array[i];
    let stars = showStars(comment.score);

    contentToAppend += `
    <div class="commentContainer">
      <div class="puntaje"> 
        ${stars}
      </div>

      <div class="commentUser">
      ${comment.user} 
      </div>

      <div class="commentDateTime">
      ${comment.dateTime}
      </div>

      <div class="commentDescription">
        <p>${comment.description}</p>
      </div>
    </div> 
  `;
  }

  document.getElementById("comments").innerHTML = contentToAppend;
}

document.addEventListener("DOMContentLoaded", function (e) {
  getJSONData(PRODUCT_INFO_URL).then(function (resultObj) {
    if (resultObj.status === "ok") {
      var product = resultObj.data;

      document.getElementById("productName").innerHTML = product.name;

      document.getElementById("productDescription").innerHTML =
        product.description;

      document.getElementById("productPrice").innerHTML = product.cost;

      document.getElementById("productCategory").innerHTML = product.category;

      document.getElementById("productSold").innerHTML = product.soldCount;

      showImagesGallery(product.images);

      const relatedProducts = resultObj.data.relatedProducts;

      //mostrar productos relacionados
      getJSONData(PRODUCTS_URL).then(function (result) {
        if (result.status === "ok") {
          let k = 0;
          console.log(relatedProducts);
          for (i = 0; i < relatedProducts.length; i++) {
            k = relatedProducts[i];
            document.getElementById("relatedProducts").innerHTML += `
            <a href = "product-info.html" class = "list-group-item list-group-item-action">
              <div class="row">
                 <div class="col-3">
                     <img src=${result.data[k].imgSrc} alt=${result.data.description} class="img-thumbnail">
                  </div>
                  <div class="col">
                     <div class="d-flex w-100 justify-content-between">
                          <h4 class="mb-1">${result.data[k].name}</h4>  
              </div>
                   <p class="mb-1">${result.data[k].description}</p>
                <p class="mb-1">${result.data[k].cost} ${result.data[k].currency}</p>
             <p class="mb-1">vendidos: ${result.data[k].soldCount}</p>
                  </div>
              </div>
        </a>
        `;
          }
        }
      });
    }
  });

  getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function (resultObj) {
    if (resultObj.status === "ok") {
      showComments(resultObj.data);
    }
  });

  document.getElementById("saveComment").addEventListener("click", function () {
    document.getElementById("newComment").value = "";
    alert("Gracias por su comentario");
  });
});
