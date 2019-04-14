const PubSub = require("../helpers/pub_sub.js");

const RenderView = function (container) {
  this.container = container;
};


RenderView.prototype.displaySearchBar = function (beersArr, foodSearch){
  this.clearTheScreen();
  let searchBoxText = ""
  searchBoxText = this.createFeedbackString(beersArr, foodSearch);
  if (searchBoxText != ""){
    this.container.appendChild(searchBoxText);
  }
}

RenderView.prototype.displayBeers = function (beer) {
  const beerBox = this.createBeerBox();

  const info = this.createInfoButton();
  beerBox.appendChild(info);
  this.boxSelect(info, beer.id);

  const name = this.createNameItem(beer.name);
  beerBox.appendChild(name);

  const image = this.createImageItem(beer.image_url)
  beerBox.appendChild(image);

  this.container.appendChild(beerBox);
}

RenderView.prototype.boxSelect = function (beerInfoBox, beerIndex) {
  beerInfoBox.addEventListener('click', (evt) => {
    PubSub.publish("RenderView:Beer-Clicked", beerIndex)
  });
};

RenderView.prototype.createBeerBox = function() {
  const beerBox = document.createElement('div');
  beerBox.classList.add('beer-item')
  return beerBox;
}

RenderView.prototype.createInfoButton = function(){
  const infoClick = document.createElement('a');

  const info = document.createElement('button');
  info.classList.add('info-button');
  infoClick.appendChild(info);

  return infoClick;
}

RenderView.prototype.createNameItem = function(beerName){
  const name = document.createElement('p');
  name.classList.add('beer-title');
  name.textContent = beerName;
  return name;
}

RenderView.prototype.createImageItem = function(imageBeerBottle){
  const image = document.createElement('img');
  image.classList.add('image-style');
  image.src = imageBeerBottle;
  return image;
}

RenderView.prototype.clearTheScreen = function(){
  this.container.innerHTML = '';
}

RenderView.prototype.createFeedbackString = function(beersArr, foodSearch){
  let searchBoxText = "";

  if (beersArr.length === 0){
    searchBoxText = document.createElement('p');
    searchBoxText.classList.add('search-feedback');

    const foodSearchFormatted = this.capitalize(foodSearch);
    searchBoxText.textContent = `Sorry there are no pairings for ${foodSearch}`;

  }else if(foodSearch != ""){
    searchBoxText = document.createElement('p');
    searchBoxText.classList.add('search-feedback');
    const foodSearchFormatted = this.capitalize(foodSearch);
    searchBoxText.textContent = `Beer Pairings for ${foodSearchFormatted}`;
  }

  return searchBoxText;
}

RenderView.prototype.capitalize = function(word) {
  word.toLowerCase();
  return word.charAt(0).toUpperCase() + word.slice(1);
}



module.exports = RenderView;
