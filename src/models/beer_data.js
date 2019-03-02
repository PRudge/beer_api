const RequestHelper = require('../helpers/request_helper.js');
const PubSub = require('../helpers/pub_sub.js');

const BeerData = function (){
  this.data = [];

}

BeerData.prototype.bindEvents = function() {

  PubSub.subscribe('BeerView:paired food search entered', (evt)  => {

    const foodIndex = evt.detail;

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
  console.log('in getPairedBeers');
  console.log(foodIndex);
}

module.exports = BeerData;
