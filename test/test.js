/* global describe, it */
var expect = require('chai').expect;

var bling = require('../lib/bling').default;

var options = { locale: 'es', currency: 'EUR', decimals: 0 };

describe('bling', function() {
  describe('converts numbers to monies', function() {
    it('should return a parsed money amount', function() {
      expect(bling(1000000, { locale: 'de-DE', currency: 'eur' })).to.equal('1,000,000 €');
    });

    //it('should have default params', function() {
      //expect(bling(2000)).to.equal('$2,000');
    //});

    // 'should default to 'USD' if currency is not supported'
    // 'should default to 'en' if not set'
    // 'should default to 0 decimals if none set'
  });
});
