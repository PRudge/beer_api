const RequestHelper = require('../helpers/request_helper.js');
const PubSub = require('../helpers/pub_sub');

const PopUpView = function(popUpWindow) {
  this.popUpWindow = popUpWindow;
  this.popUpDets = "";
};

PopUpView.prototype.bindEvents = function () {



}; // bindEvents



module.exports = PopUpView;
