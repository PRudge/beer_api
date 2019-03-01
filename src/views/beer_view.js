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
}; // bindEvents

BeerView.prototype.displayBeers = function(beers){
  console.log(beers);
  const option = document.createElement('h3');
  option.textContent = "hello";
  this.container.appendChild(option)

}


module.exports = BeerView;
