const url = 'https://course-api.com/javascript-store-products';

const productsDOM = document.querySelector('.products-center');
const fetchProducts = async () => {
  // loading
  productsDOM.innerHTML = '<div class="loading"></div>';
  try {
    const resp = await fetch(url);
    const data = await resp.json();
    // products data
    return data;
  } catch (error) {
    productsDOM.innerHTML = `<p class="error">there was an error</p>`;
  }};
const displayProduct = (list) => {
  const displayContent = list
    .map((singleProduct) => {
      const { id } = singleProduct;
      const { name: title, price } = singleProduct.fields;
      const { url: img } = singleProduct.fields.image[0];
      return `<a href="product.html?id=${id}&name=john&age=25" class="single-product">
      <img src="${img}" alt="${title}" class="single-product-img img">
      <footer>
      <h5 class="name">${title}</h5>
      <span class="price">$${price / 100}</span>
      </footer>
      </a>`;
    })
    .join('');
  productsDOM.innerHTML = `<div class="products-container">${displayContent}</div>`;
};
const start = async () => {
  const data = await fetchProducts();
  displayProduct(data);
};

start();
