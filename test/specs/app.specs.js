'use strict';

var system = require('../../jspm_packages/system.src.js');
             require('../../config.js');

var sinon = require('sinon');
var chai = require('chai')
  , expect = chai.expect
  , should = chai.should();

describe('App', function(){
  var sut;
  var fakeRouter = { configure: sinon.spy() };

  beforeEach(function(done) {
    system.import('src/app').then(function(module) {
      sut = new module.App(fakeRouter);
      done();
    });
  });

  describe('when creating a new instance', function() {
    it('should simply do', function() {
      sut.should.not.be.null();
    });

    it('should call router configuration', function() {
      fakeRouter.configure.calledWith(sut.configureRoutes).should.be.true();
    });
  });

  describe('when configuring the router', function() {
    var config = { map: sinon.spy() };

    it('should set the title', function() {
      sut.configureRoutes(config);
      config.title.should.equal("TodoMVC");
    });

    it('should set up the default route', function() {
      sut.configureRoutes(config);

      var maps = config.map.lastCall.args[0];
      var defaultRouteMap = maps[0];

      defaultRouteMap.route.should.contain('');
      defaultRouteMap.route.should.contain(':filter');
      defaultRouteMap.moduleId.should.equal('todos');
    });
  });

});
