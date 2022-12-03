const productDOM = document.querySelector('.product');
const url = 'https://course-api.com/javascript-store-single-product';
const fetchProduct = async () => {
  productDOM.innerHTML = '<h4 class="product-loading">Loading....</h4>';
  try {
    // const id = window.location.search.slice(4);
    // console.log(id);
    // const formatedUrl = url + id;
    // const response = await fetch(formatedUrl);
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');
    const response = await fetch(`${url}?id=${id}`);
    const data = await response.json();
    return data;
  } 
  catch (error) {
    productDOM.innerHTML = '<p class="error">There was a problem loading the product. Please try again later</p>';
  }
}
const displayProduct = (product) => {
  const {price, name:title, description: info, company, colors, image} = product.fields;
  const {url: img} = image[0];
  document.title = title.toUpperCase();
  const availableColors = colors.map((color) => `<span class="product-color" style="background-color:${color}"></span>`).join('');
  productDOM.innerHTML = `<div class="product-wrapper">
      <img src="${img}" alt="${title}" class="img">
      <div class="product-info">
        <h3>${title}</h3>
        <h5>${company}</h5>
        <span>$${price / 100}</span>
        <div class="colors">${availableColors}
        </div>
        <p>${info}</p>
        <button class="btn">add to cart</button>
      </div>
    </div>`;
};
const start = async () => {
  const data = await fetchProduct();
  displayProduct(data);
}
start();