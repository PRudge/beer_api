const RequestHelper = require('../helpers/request_helper.js');
const PubSub = require('../helpers/pub_sub');

const BeerView = function(element) {
  this.element = element;
  console.log(`elemente${element}`)
};

BeerView.prototype.bindEvents = function () {
  PubSub.subscribe('BeerData:beer data loaded', (evt) => {

    const beers = evt.detail;
    this.displayBeers(beers)

  }); // subscribe
}; // bindEvents

BeerView.prototype.displayBeers = function(beers){

  beers.forEach((beer) => {
    const beerBox = document.createElement('div');
    beerBox.classList.add('beer-item')
    const option = document.createElement('p');
    // option.classList.add('beer-title');
    option.textContent = beer.name;

    beerBox.appendChild(option);

    const image = document.createElement('img');
    image.src = beer.image_url;
    beerBox.appendChild(image);

    this.element.appendChild(beerBox);

  });


}


module.exports = BeerView;
