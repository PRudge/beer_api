const RequestHelper = require('../helpers/request_helper.js');
const PubSub = require('../helpers/pub_sub');

const BeerView = function(container) {
  this.container = container;
};

BeerView.prototype.bindEvents = function () {
  PubSub.subscribe('BeerData:beer data loaded', (evt) => {
    const beers = evt.detail;
    this.displayBeers(beers)
  }); // subscribe

  // const searchElement = document.querySelector("search-field");
  // searchElement.addEventListener('search', (evt) => {
  //     const foodSearch = evt.value;
  //     PubSub.publish('BeerView:paired food search entered', foodSearch);
  //   });

  const searchElement = document.getElementById("search-field");
  searchElement.addEventListener("search", (event) => {
    const foodSearch = searchElement.value;
    PubSub.publish('BeerView:paired food search entered', foodSearch);
  });
}; // bindEvents

BeerView.prototype.displayBeers = function(beersArr){
  this.clearTheScreen();

  beersArr.forEach((beer) => {
    const beerBox = this.createBeerBox();

    const name = this.createNameItem(beer.name);
    beerBox.appendChild(name);

    const image = this.createImageItem(beer.image_url)
    beerBox.appendChild(image);

    this.container.appendChild(beerBox);
  });
}

BeerView.prototype.clearTheScreen = function(){
  this.container.innerHTML = '';
}

BeerView.prototype.createBeerBox = function() {
  const beerBox = document.createElement('div');
  beerBox.classList.add('beer-item')
  return beerBox;
}

BeerView.prototype.createNameItem = function(beerName){
  const name = document.createElement('p');
  name.classList.add('beer-title');
  name.textContent = beerName;
  return name;
}

BeerView.prototype.createImageItem = function(imageBeerBottle){
  const image = document.createElement('img');
  image.classList.add('image-style');
  image.src = imageBeerBottle;
  return image;
}


module.exports = BeerView;
