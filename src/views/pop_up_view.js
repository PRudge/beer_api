const RequestHelper = require('../helpers/request_helper.js');
const PubSub = require('../helpers/pub_sub');

const PopUpView = function(popUpWindow) {
  this.popUpWindow = popUpWindow;
  this.popUpDets = "";
};

PopUpView.prototype.bindEvents = function () {


 // document.getElementById(".beer-item").addEventListener("click", displayPopUp);
  // const beerElement = document.querySelector(".beer-item");
  // beerElement.addEventListener('click', (evt) => {
  //     this.popUpDets = evt.value;
  //     PubSub.publish('PopUpView:information pop up requested', this.popUpDets);
    // });


}; // bindEvents



module.exports = PopUpView;
