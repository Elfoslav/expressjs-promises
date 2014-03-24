var Q = require('q');

exports.createOrder = function(data, throwError) {
  console.log('creating order, data: ', data);
  var deferred = Q.defer();
  setTimeout(function() {
    if(throwError)
      deferred.reject(new Error('An error occured'));
    deferred.resolve({ customer: { name: 'Peter Kong' }, orderId: 123 });
  }, 500);
  
  return deferred.promise;
}

exports.processPayment = function(data, throwError) {
  console.log('processing payment, data: ', data);
  var deferred = Q.defer();
  setTimeout(function() {
    if(throwError) {
      deferred.reject(new Error('An error occured in processPayment'));
    }
    deferred.resolve(data);
  }, 800);
  
  return deferred.promise;
}

exports.confirmOrder = function(data, throwError) {
  console.log('confirming order, data: ', data);
  var deferred = Q.defer();
  setTimeout(function() {
    if(throwError)
      deferred.reject(new Error('An error occured'));
    deferred.resolve(data);
  }, 500);
  
  return deferred.promise;
}

exports.sendEmail = function(data, throwError) {
  console.log('sending email, data: ', data);
  var deferred = Q.defer();
  setTimeout(function() {
    if(throwError)
      deferred.reject(new Error('An error occured'));
    deferred.resolve(data);
  }, 500);
  
  return deferred.promise;
}