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
    console.log(beer);
    const option = document.createElement('h3');
    option.textContent = beer.name;
    console.log(`hi ${option}`);

    this.element.appendChild(option);
  });


}


module.exports = BeerView;
