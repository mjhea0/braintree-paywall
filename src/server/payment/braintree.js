var gateway = require('../config/payment-config');

function getClientToken(callback) {
  gateway.clientToken.generate({}, function (err, response) {
    if (err) {
      callback(err);
    }
    if (response.clientToken) {
      callback(null, response.clientToken);
    } else {
      callback(null, response);
    }
  });
}

function createTransaction(nonce, callback) {
  gateway.transaction.sale({
    amount: '10.00',
    paymentMethodNonce: nonce
  },
  function (err, result) {
    if (err) {
      callback(err);
    }
    if (result) {
      callback(null, result);
    }
	});
}

module.exports = {
  getClientToken: getClientToken,
  createTransaction: createTransaction
};
