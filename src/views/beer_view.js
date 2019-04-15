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
    console.log(beers)
    this.renderBeersView(beers);
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

BeerView.prototype.renderBeersView = function(beersArr){
  const renderView = new RenderView(this.container);
  renderView.displaySearchBar(beersArr, this.foodSearch);
  this.render(beersArr);
}

BeerView.prototype.render = function (beersArr) {
  beersArr.forEach((item)=>{
    const renderView = new RenderView(this.container)
    renderView.displayBeers(item)
  });
};

module.exports = BeerView;
