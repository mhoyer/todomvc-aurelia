'use strict';

var system = require('../../jspm_packages/system.js');
var chai = require('chai')
  , expect = chai.expect
  , should = chai.should();

describe('TodoItem', function(){
    var sut;

    beforeEach(function(done) {
      system.import('src/todo-item').then(function(module) {
        sut = new module.TodoItem("foo");
        done();
      });
    });

    describe('when creating a new instance', function() {

      it('should not mark the item as done', function() {
        sut.isChecked.should.be.false();
      });

      it('should set given title', function() {
        sut.title.should.equal("foo");
      });

    });
});
