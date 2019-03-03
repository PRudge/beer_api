const PubSub = require('./helpers/pub_sub.js');
const BeerData = require('./models/beer_data.js');
const BeerView = require('./views/beer_view.js');
// const PopUpView = require('./views/pop_up_view.js');

document.addEventListener('DOMContentLoaded', () => {

  const beerContainer = document.querySelector("div#beer-container");
  const beerView = new BeerView(beerContainer);
  beerView.bindEvents();

  const beerData = new BeerData;
  beerData.getData();
  beerData.bindEvents();

  // const popUpWindow = document.querySelector("#pop-up-window");
  // const popUpView = new PopUpView(popUpWindow);
  // popUpView.bindEvents();


}); // #dom contentloaded
