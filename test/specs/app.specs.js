'use strict';

var system = require('../../jspm_packages/system.js');
             require('../../config.js');

var sinon = require('sinon');
var chai = require('chai')
  , expect = chai.expect
  , should = chai.should();

describe('App', function(){
  var sut;

  beforeEach(function(done) {
    system.import('src/app').then(function(module) {
      sut = new module.App();
      done();
    });
  });

  describe('when creating a new instance', function() {

    it('should simply do', function() {
      sut.should.not.be.null();
    });

  });
});
