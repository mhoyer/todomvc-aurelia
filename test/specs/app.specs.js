'use strict';
import {App} from 'src/app';

describe('App', () => {
  var sut;
  var fakeRouter = { configure: sinon.spy() };

  beforeEach(() => {
    sut = new App(fakeRouter);
  });

  describe('when creating a new instance', () => {
    it('should simply do', () => {
      sut.should.not.be.null;
    });

    it('should call router configuration', () => {
      fakeRouter.configure.should.have.been.calledWith(sut.configureRoutes);
    });
  });

  describe('when configuring the router', () => {
    var config = { map: sinon.spy() };

    it('should set the title', () => {
      sut.configureRoutes(config);
      config.title.should.equal("TodoMVC");
    });

    it('should set up the default route', () => {
      sut.configureRoutes(config);

      var maps = config.map.lastCall.args[0];
      var defaultRouteMap = maps[0];

      defaultRouteMap.route.should.contain('');
      defaultRouteMap.route.should.contain(':filter');
      defaultRouteMap.moduleId.should.equal('todos');
    });
  });

});
