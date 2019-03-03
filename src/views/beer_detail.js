const BeerDetail = function () {};

BeerDetails.prototype.createBeerDetail= function (beer) {
  const beetDetail = document.createElement('div');
  beerDetail.classList.add('beer-detail');

  const name = document.createElement('h3');
  name.textContent = beer.name;
  beerDetail.appendChild(name);

  const detailsList = document.createElement('ul');

  beerDetail.appendChild(detailsList);
  return beerDetail;
};

BeerDetails.prototype.createDetailListItem = function (label, property) {
  const element = document.createElement('li');
  element.textContent = `${label}: ${property}`;
  return element;
};

module.exports = BeerDetailView;
