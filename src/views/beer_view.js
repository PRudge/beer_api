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
  
  const searchElement = document.getElementById("search");
  searchElement.addEventListener("search", function(e) {
      const foodSearch = searchElement.value;
      console.log(foodSearch);
      PubSub.publish('BeerView:paired food search entered', foodSearch);

  }, false);



}; // bindEvents

BeerView.prototype.displayBeers = function(beers){

  beers.forEach((beer) => {
    const beerBox = document.createElement('div');
    beerBox.classList.add('beer-item')
    const option = document.createElement('p');
    option.classList.add('beer-title');
    option.textContent = beer.name;

    beerBox.appendChild(option);

    const image = document.createElement('img');
    image.classList.add('image-style');
    image.src = beer.image_url;
    beerBox.appendChild(image);

    this.container.appendChild(beerBox);

  });


}


module.exports = BeerView;
