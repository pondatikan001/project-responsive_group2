//Home
const getProduct = async () => {
  try {
      const response = await axios.get(
          "https://6102d7aa79ed680017482359.mockapi.io/productlist"
      );
      document.getElementById("allProductCard").innerHTML = response.data
          .map(
              (product) =>
                  `
              <div class="col-lg-3 col-md-4 col-6  flex-wrap style="margin: 0 auto;">
                  <div class="card card-page1">
                      <img src="${product.prdImageUrl}" class="card-img-top" alt="pic1">
                      <div class="card-body">
                          <h8 class="card-title">${product.prdname} </h8>
                          <div class="row card-price-btn">
                              <div class="col">
                                  <p class="card-text">${product.prdPrice}THB</p>
                              </div>
                              <div class="col">
                                  <button onclick="location.href = 'product.html?id=${product.id}';" type="button " class="btn btn-dark btn-addproductCart">Add product</button>
                              </div>
                              </div>
                      </div>
                  </div>
              </div>

          `
          )
          .join("");
  } catch (e) {
      console.log(`e`, e);
  }
};

const activeImage = document.querySelector(".carou-image-ac");
const activeText = document.querySelector(".active-text");
const getCarousel = async () => {
  try {
      const response = await axios.get(
          "https://6102d7aa79ed680017482359.mockapi.io/slider"
      );
      activeImage.src = response.data[3].imageUrl;
      activeText.innerHTML = response.data[3].sliderText;
      document.getElementById("carouselImage").innerHTML = response.data
      document.getElementById("carouselImage").innerHTML = response.data
          .map(
              (imageCarou) =>

                  `
          <div class="carousel-item ">
              <img src="${imageCarou.imageUrl}" class="d-block" alt="...">
                  <div class="carousel-caption d-block">
                      <p>${imageCarou.sliderText}</p>
                  </div>
          </div>
          
          ${console.log(imageCarou.sliderText)}
          `
          )
          .join("");
  } catch (e) {
      console.log(`e`, e);
  }
}
