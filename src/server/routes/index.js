var express = require('express');
var braintree = require('braintree');

var braintree = require('../payment/braintree');
var paid = false;

var router = express.Router();

router.get('/', function (req, res, next) {
  var renderObject = {};
  renderObject.title = 'Braintree Paywall';
  // get client token
  braintree.getClientToken(function(err, token) {
    if (err) {
      return next(err);
    }
    renderObject.token = token;
    res.render('index', renderObject);
  });
});

router.post('/checkout', function(req, res, next) {
  var nonce = req.body.payment_method_nonce;
  braintree.createTransaction(nonce, function(err, result) {
    if (err) {
      return next(err);
    }
    if (result.success || result.transaction) {
      paid = true;
      res.redirect('/paid');
    } else {
      console.log('handle this error!');
    }
  });
});

router.get('/paid', function(req, res, next) {
  if (paid) {
    res.json('yay!');
  } else {
    res.json('nay!');
  }
});

module.exports = router;
