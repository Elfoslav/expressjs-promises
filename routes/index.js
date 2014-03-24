var createOrder = require('../functions').createOrder;
var processPayment = require('../functions').processPayment;
var confirmOrder = require('../functions').confirmOrder;
var sendEmail = require('../functions').sendEmail;

/*
 * GET home page.
 */

exports.index = function(req, res){
  createOrder()
    .then(function(data) {
      return processPayment(data, true);
    }, function(err) {
      console.log('createOrder err:', err);
      throw err;
    })
    .then(function(data) {
      return confirmOrder(data);
    }, function(err) {
      console.log('processPayment err:', err);
      res.render('index', { title: 'Express and promises - payment error', error: err });
      //if we do not throw error, next promise will be called
      throw err;
    })
    .then(function(data) {
      return sendEmail(data);
    }, function(err) {
      console.log('confirmOrder err:', err);
      throw err;
    })
    .then(function(data) {
      console.log('sendEmai success:', data);
      //call/render response in the last Promise
      res.render('index', { title: 'Express and promises - last promise' });
    }, function(err) {
      console.log('sendEmail err:', err);
    })
    .fin(function() {
      console.log('Finally promise');
    })
    .done();
};