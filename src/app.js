const PubSub = require('./helpers/pub_sub.js');
const BeerData = require('./models/beer_data.js');
const BeerView = require('./views/beer_view.js')

document.addEventListener('DOMContentLoaded', () => {


    const beerContainer = document.querySelector("div#beer-container");

    const beerView = new BeerView(beerContainer);
    console.log(beerContainer);
    beerView.bindEvents();


  const beerData = new BeerData;
  beerData.getData();
  beerData.bindEvents();


}); // #dom contentloaded
