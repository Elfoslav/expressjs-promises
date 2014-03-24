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
      console.log('processPayment err:', err);
      throw err;
    })
    .then(function(data) {
      return confirmOrder(data);
    }, function(err) {
      console.log('confirmOrder err:', err);
      throw err;
    })
    .then(function(data) {
      return sendEmail(data);
    }, function(err) {
      console.log('sendEmail err:', err);
      throw err;
    })
    .fail(function(err) {
      console.log('catch err:', err);
    })
    .fin(function() {
      console.log('Finally promise');
    })
    .done(function() {
      res.render('index', { title: 'Express and promises' });
    });
};