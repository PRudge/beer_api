const RequestHelper = require('../helpers/request_helper.js');
const PubSub = require('../helpers/pub_sub.js');

const BeerData = function (){
  this.data = [];
  this.pairedBeers = [];
}

BeerData.prototype.bindEvents = function() {
  PubSub.subscribe('BeerView:paired food search entered', (evt)  => {

    const foodToSearch = evt.detail;
    if (foodToSearch === ""){ // no input so display all the beers
      PubSub.publish('BeerData:beer data loaded', this.data);
    }

    this.getPairedBeers(foodToSearch);
  });

  PubSub.subscribe('BeerView:change', (evt)  => {

    const beerIndex = evt.detail;
    this.publishBeersByOneBeer(beerIndex);
  });

  // PubSub.subscribe('BeerView:Beer-Clicked',(evt) => {
  //
  //   console.log("we hear you");
  //
  //
  // });
};

  // PubSub.subscribe('BeerView:information pop up requested', (evt)  => {
  //   console.log(`hello`, evt.detail);
  // })



BeerData.prototype.publishBeersByOneBeer = function (){
  console.log('I am here')
}

// BeerData.prototype.publishBeers = function(beers){
//   this.beersArr = data;
//   this.beers = this.getUniqueBeerDets();
//
//   PubSub.publish('BeerData:beers ready', this.beers);
// }

BeerData.prototype.getData = function () {
  const request = new RequestHelper ('https://api.punkapi.com/v2/beers');
  request.get().then ((data) => {
    this.data = data;

    PubSub.publish('BeerData:beer data loaded', this.data);
  });
};

BeerData.prototype.getPairedBeers = function (foodToSearch) {
  this.pairedBeers = []; // clear this down so that it is ready for next search
  this.data.forEach(beerDets =>{
    beerDets.food_pairing.forEach(beerFoodPair => {
      if (beerFoodPair.toLowerCase().match(foodToSearch.toLowerCase())) {
        this.pairedBeers.push(beerDets)
      }
    });
  });

  const uniqueBeerDetails = this.getUniqueBeerDets();


  PubSub.publish('BeerData:beer data loaded', uniqueBeerDetails);
} // getPairedBeers


BeerData.prototype.getUniqueBeerDets = function () {
  const mapBeerIds = this.getMapOfBeerIds();
  const areIdsUnique = this.checkIfIdsUnique(mapBeerIds);
  const uniqueKeys = this.createUniqueArr(areIdsUnique);
  const uniqueBeerArr = this.storeUniqueBeers(uniqueKeys)

  return uniqueBeerArr;
}

BeerData.prototype.getMapOfBeerIds = function () {
  const mapBeerIds = this.pairedBeers.map(beerElement => beerElement.id);
  return mapBeerIds
}

BeerData.prototype.checkIfIdsUnique = function (mapBeerIds) {
  const areKeysUnique = mapBeerIds.map((beerElement, index, array) => array.indexOf(beerElement) === index && index);
  return areKeysUnique;
}

BeerData.prototype.createUniqueArr = function (areKeysUnique) {
  const uniqueKeys = areKeysUnique.filter(beerElement => this.pairedBeers[beerElement])
  return uniqueKeys;
}

BeerData.prototype.storeUniqueBeers = function (uniqueKeys) {
  const uniqueBeerArr = uniqueKeys.map(beerElement => this.pairedBeers[beerElement]);
  return uniqueBeerArr;
}


module.exports = BeerData;
