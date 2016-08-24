process.env.NODE_ENV = 'test';

var chai = require('chai');
var should = chai.should();
var braintree = require('../../src/server/payment/braintree');

describe('payment : braintree', function() {

  describe('getClientToken()', function () {
    it('should provide a token', function (done) {
      braintree.getClientToken(function(err, token) {
        token.should.be.a('string');
        done();
      });
    });
  });

  describe('createTransaction()', function () {
    var nonce = 'fake-valid-nonce';
    it('should provide transaction info', function (done) {
      braintree.createTransaction(nonce, function(err, res) {
        res.should.be.a('object');
        res.success.should.equal(true);
        done();
      });
    });
  });

});
