const RequestHelper = require('../helpers/request_helper.js');
const PubSub = require('../helpers/pub_sub.js');

const BeerData = function (){
  this.data = [];
  this.pairedBeers = [];

}

BeerData.prototype.bindEvents = function() {

  PubSub.subscribe('BeerView:paired food search entered', (evt)  => {

    const foodIndex = evt.detail;
    if (foodIndex === ""){
      PubSub.publish('BeerData:beer data loaded', this.data);
    }

    this.getPairedBeers(foodIndex);
  })
};


BeerData.prototype.getData = function () {
  const request = new RequestHelper ('https://api.punkapi.com/v2/beers');
  request.get().then ((data) => {
    this.data = data;

    PubSub.publish('BeerData:beer data loaded', this.data);
  });

};


BeerData.prototype.getPairedBeers = function (foodIndex) {
  this.pairedBeers = [];
  this.data.forEach(beerDets =>{
    beerDets.food_pairing.forEach(beerFoodPair => {

      if (beerFoodPair.match(foodIndex)) {
        this.pairedBeers.push(beerDets)

      }
    }) // for each food_pairing element for a beer
  }) // for each beerDet


  const unique = this.pairedBeers
  .map(e => e.id)

  // store the keys of the unique objects
  .map((e, i, final) => final.indexOf(e) === i && i)

  // eliminate the dead keys & store unique objects
  .filter(e => this.pairedBeers[e]).map(e => this.pairedBeers[e]);

  PubSub.publish('BeerData:beer data loaded', unique);
} // getPairedBeers

module.exports = BeerData;
