const RequestHelper = require('../helpers/request_helper.js');
const PubSub = require('../helpers/pub_sub');

const PopUpView = function(popUpWindow) {
  this.popUpWindow = popUpWindow;

  this.popUpWindow.classList.add('hidden');
  this.popUpDets = "";
};

PopUpView.prototype.bindEvents = function () {

  PubSub.subscribe('BeerData:selected-beer-ready',(evt) => {

    console.log(`we hear you ${evt.detail.name}`);

  this.popUpWindow.classList.remove('hidden');
  this.popUpWindow.classList.add('view'); // 16

});
} // bindEvents



module.exports = PopUpView;
