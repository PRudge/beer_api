const RequestHelper = require('../helpers/request_helper.js');
const PubSub = require('../helpers/pub_sub');

const BeerView = function(container) {
  this.container = container;
  this.foodSearch = "";
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
    this.foodSearch = searchElement.value;
    PubSub.publish('BeerView:paired food search entered', this.foodSearch);
  });
}; // bindEvents

BeerView.prototype.displayBeers = function(beersArr){
  this.clearTheScreen();

    if (beersArr.length === 0){
      const searchBoxText = document.createElement('p');
      searchBoxText.classList.add('search-feedback');

      const foodSearchFormatted = this.capitalize(this.foodSearch);
      searchBoxText.textContent = `Sorry there are no pairings for ${this.foodSearch}`;
      this.container.appendChild(searchBoxText);
    }else if(this.foodSearch != ""){
      const searchBoxText = document.createElement('p');
      searchBoxText.classList.add('search-feedback');
      const foodSearchFormatted = this.capitalize(this.foodSearch);
      searchBoxText.textContent = `Beer Pairings for ${foodSearchFormatted}`;
      this.container.appendChild(searchBoxText);
  
  }


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

BeerView.prototype.capitalize = function(word) {
    word.toLowerCase();
    return word.charAt(0).toUpperCase() + word.slice(1);
}


module.exports = BeerView;
