
import algoliasearch from "algoliasearch";
alert("hello")
const client = algoliasearch("U00UVD88XZ", "a00c95c87ab0f8eb9edc77d5542a8cee");
const index = client.initIndex("search");

console.log("hello")


let data = []

let resultsRootElement = document.querySelector('.results')
fetch('https://fakestoreapi.com/products')
  .then(res => res.json())
  .then(json => {
    data = json;
    console.log(data)
  })


document.querySelector('#searchInput').addEventListener('keyup', () => {
  let searchTerm = (document.querySelector('#searchInput').value)
  let resultsArray = []

  if (String(searchTerm).trim().length > 0) {


    index.search(searchTerm).then(({ hits }) => {
      console.log(hits);
    })
      .catch(err => { console.log(err); });
    renderProducts(resultsArray)


  } else { removeElements() }

})


function renderProducts(products) {
  document.querySelectorAll('.result').forEach(prod => {
    prod.remove()
  })
  products.forEach(product => {
    renderSingleProduct(product);
  })
}
function renderSingleProduct(product) {
  let resultDiv = document.createElement('div')
  let resultImage = document.createElement('img')
  let resultTitle = document.createElement('h4')
  let resultPrice = document.createElement('p')
  let purchaseButton = document.createElement('button')
  purchaseButton.value = 'Purchase'

  resultImage.src = product.image
  resultTitle.innerText = product.title
  resultPrice.innerText = product.price;


  resultDiv.appendChild(resultImage)
  resultDiv.appendChild(resultTitle)
  resultDiv.appendChild(resultPrice)
  resultDiv.appendChild(purchaseButton)

  resultsRootElement.appendChild(resultDiv)
}
