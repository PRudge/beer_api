const RequestHelper = require('../helpers/request_helper.js');
const PubSub = require('../helpers/pub_sub');

const PopUpView = function(popUpWindow) {
  this.popUpWindow = popUpWindow;

  this.popUpWindow.classList.add('hidden');
  this.popUpDets = "";
};

PopUpView.prototype.bindEvents = function () {
  PubSub.subscribe('BeerView:Beer-Clicked',(evt) => {

    console.log(`we hear you ${evt.detail}`);

  this.popUpWindow.classList.remove('hidden');
  this.popUpWindow.classList.add('view'); // 16
  // addForm(); // 17
    // window.open('','popUpWindow','height=500,width=400,left=100,top=100,resizable=yes,scrollbars=yes,toolbar=yes,menubar=no,location=no,directories=no, status=yes');



  });



}; // bindEvents



module.exports = PopUpView;
