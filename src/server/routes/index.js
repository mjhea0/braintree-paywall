var express = require('express');
var braintree = require('braintree');

var braintree = require('../payment/braintree');
var paid = false;

var router = express.Router();

router.get('/', function (req, res, next) {
	braintree.getClientToken(function(err, token) {
    if (err) {
      return next(err);
    }
    var renderObject = {};
    renderObject.title = 'Braintree Paywall - free';
    renderObject.token = token;
    res.render('index', renderObject);
	});
});

router.post('/checkout', function(req, res, next) {
  var nonce = 'fake-valid-nonce';
  braintree.createTransaction(nonce, function(err, token) {
    if (err) {
      return next(err);
    }
		paid = true;
    res.redirect('/paid');
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
