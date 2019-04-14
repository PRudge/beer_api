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

  const closeButton = document.createElement('button');
  closeButton.classList.add('close-btn');

  popUpBox.appendChild(closeButton);

  closeButton.addEventListener('click', (evt) => {
    PubSub.publish('PopUpView:close-click', evt.target.value);
  });

  const tagLine = document.createElement('p');
  tagLine.classList.add('beer-tagline-pu');
  tagLine.textContent = beer.tagline;
  popUpBox.appendChild(tagLine);

  const image = document.createElement('img');
  image.classList.add('image-style-pu');
  image.src = beer.image_url;
  popUpBox.appendChild(image);
  this.popUpWindow.appendChild(popUpBox);

  const beerDetails = document.createElement('ul');
  beerDetails.classList.add('beer-details-pu');
  // const tagLine = this.createDetailsListItem('Tag Line', beer.tagline);
  // beerDetails.appendChild(tagLine);

  const description = this.createDetailsListItem('Description', beer.description);
  beerDetails.appendChild(description);

  const abv = this.createDetailsListItem('ABV', beer.abv);
  beerDetails.appendChild(abv);

  const foodPairedTitle = document.createElement('li');
  foodPairedTitle.classList.add('food-paired-pu');
  foodPairedTitle.textContent = "Paired Foods:";
  beerDetails.appendChild(foodPairedTitle);

  const foodPairedList = document.createElement('ul');

  beer.food_pairing.forEach(food => {
    const foodPaired = this.createDetailsListItem('', food);
    foodPairedList.appendChild(foodPaired);


  });

  beerDetails.appendChild(foodPairedList);

  popUpBox.appendChild(beerDetails);

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

PopUpView.prototype.createDetailsListItem = function(label, property ){
  const element = document.createElement('li');
  element.textContent = `${label}: ${property}`;
  return element;
}

module.exports = PopUpView;
