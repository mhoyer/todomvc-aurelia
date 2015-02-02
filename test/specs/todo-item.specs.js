'use strict';

var system = require('../../jspm_packages/system.js');
var chai = require('chai')
  , expect = chai.expect
  , should = chai.should();

describe('TodoItem', function(){
  var TodoItem;
  var sut;

  beforeEach(function(done) {
    system.import('src/todo-item').then(function(module) {
      TodoItem = module.TodoItem;
      sut = new TodoItem("foo");
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

    it('should trim given title', function() {
      sut = new TodoItem("   foo   ");
      sut.title.should.equal("foo");
    });

    it('should not activate the edit mode', function() {
      sut.isEditing.should.be.false();
    });
  });

});
