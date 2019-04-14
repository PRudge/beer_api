const RequestHelper = require('../helpers/request_helper.js');
const PubSub = require('../helpers/pub_sub');

const PopUpView = function(popUpWindow) {
  this.popUpWindow = popUpWindow;
  this.popUpDets = "";
};

PopUpView.prototype.bindEvents = function () {

  PubSub.subscribe('BeerData:selected-beer-ready',(evt) => {

    const beerPopUp = evt.detail;

    this.displayPopUp(beerPopUp);

  });
} // bindEvents

PopUpView.prototype.displayPopUp = function (beer) {

  this.popUpWindow.classList.remove('hidden');
  this.popUpWindow.classList.add('view');
  this.clearTheScreen();

  const popUpBox = this.createBeerPopUp();

  const name = document.createElement('p');
  name.classList.add('beer-title-pu');
  name.textContent = beer.name;
  console.log(beer.name);
  popUpBox.appendChild(name);

  const image = document.createElement('img');
  image.classList.add('image-style-pu');
  image.src = beer.image_url;
  popUpBox.appendChild(image);

  this.popUpWindow.appendChild(popUpBox);
}

PopUpView.prototype.clearTheScreen = function(){
  this.popUpWindow.innerHTML = '';
}

PopUpView.prototype.createBeerPopUp = function() {
  const popUpBox = document.createElement('div');
  popUpBox.classList.add('popUp-info')
  return popUpBox;
}

module.exports = PopUpView;
