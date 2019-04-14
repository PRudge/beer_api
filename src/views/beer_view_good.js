const RequestHelper = require('../helpers/request_helper.js');
const PubSub = require('../helpers/pub_sub');

const RenderView = require('./render_view.js');

const BeerView = function(container) {
  this.container = container;
  this.foodSearch = "";
  this.selectBeer = "";
};

BeerView.prototype.bindEvents = function () {
  PubSub.subscribe('BeerData:beer data loaded', (evt) => {
    const beers = evt.detail;
    console.log(beers);
    this.displayBeers(beers);
    this.populateSelect(beers);
  });

  const searchElement = document.getElementById("search-field");
  searchElement.addEventListener("search", (event) => {
    this.foodSearch = searchElement.value;
    PubSub.publish('BeerView:paired food search entered', this.foodSearch);
  });

  this.selectBeer = document.querySelector("#beer-select");
  this.selectBeer.addEventListener('change', (evt) => {
    const beerIndex = evt.target.value;
    PubSub.publish('BeerView:change', beerIndex);
  })
}; // bindEvents

BeerView.prototype.populateSelect = function(beersArr) {

  this.selectBeer = document.querySelector("#beer-select");

  beersArr.forEach((beer, index) => {
    const option = this.createBeerOption(beer, index);
    this.selectBeer.appendChild(option);
  });
  return this.selectBeer;

}

BeerView.prototype.createBeerOption = function (beer, index) {
  const option = document.createElement('option');
  option.textContent = beer.name;
  option.value = index;

  return option;
};

BeerView.prototype.displayBeers = function(beersArr){
  this.clearTheScreen();
  let searchBoxText = ""
  searchBoxText = this.createFeedbackString(beersArr);
  if (searchBoxText != ""){
    this.container.appendChild(searchBoxText);
  }

  // this.render();

  beersArr.forEach((beer) => {
    const beerBox = this.createBeerBox();

    const info = this.createInfoButton();
    beerBox.appendChild(info);
    this.boxSelect(info, beer.id);

    const name = this.createNameItem(beer.name);
    beerBox.appendChild(name);

    const image = this.createImageItem(beer.image_url)
    beerBox.appendChild(image);

    this.container.appendChild(beerBox);

  });
}

// BeerView.prototype.render = function (beersArr) {
// beersArr.forEach((item)=>{
//   const renderView = new RenderView(this.container)
//   renderView.render(item)
// });
// };


BeerView.prototype.boxSelect = function (beerBox, beerName) {
  beerBox.addEventListener('click', (evt) => {
    PubSub.publish("BeerView:Beer-Clicked", beerName)
  });
};

BeerView.prototype.clearTheScreen = function(){
  this.container.innerHTML = '';
}

BeerView.prototype.createFeedbackString = function(beersArr){
  let searchBoxText = "";

  if (beersArr.length === 0){
    searchBoxText = document.createElement('p');
    searchBoxText.classList.add('search-feedback');

    const foodSearchFormatted = this.capitalize(this.foodSearch);
    searchBoxText.textContent = `Sorry there are no pairings for ${this.foodSearch}`;

  }else if(this.foodSearch != ""){
    searchBoxText = document.createElement('p');
    searchBoxText.classList.add('search-feedback');
    const foodSearchFormatted = this.capitalize(this.foodSearch);
    searchBoxText.textContent = `Beer Pairings for ${foodSearchFormatted}`;
  }

  return searchBoxText;
}

BeerView.prototype.createBeerBox = function() {
  const beerBox = document.createElement('div');
  beerBox.classList.add('beer-item')
  return beerBox;
}

BeerView.prototype.createInfoButton = function(){
  const infoClick = document.createElement('a');

  const info = document.createElement('button');
  info.classList.add('info-button');
  infoClick.appendChild(info);

  return infoClick;
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

BeerView.prototype.capitalize = function(word) {
  word.toLowerCase();
  return word.charAt(0).toUpperCase() + word.slice(1);
}


module.exports = BeerView;
