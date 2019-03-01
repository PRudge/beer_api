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
  console.log(beers);


  beers.forEach((beer) => {
    const option = document.createElement('h3');
    option.textContent = beer.name;

    this.element.appendChild(option);

    const image = document.createElement('img');
    image.src = beer.image_url;
    this.element.appendChild(image);

  });


}


module.exports = BeerView;
