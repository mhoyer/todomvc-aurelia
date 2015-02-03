'use strict';

var system = require('../../jspm_packages/system.src.js');

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

  describe('when double clicking an item', function() {
    it('should not set the edit mode when clicked only once', function() {
      sut.labelClicked();
      sut.isEditing.should.be.false();
    });

    // uuuh, not the best way to test time related stuff?
    it('should activate the edit mode when double clicked within e.g. 50ms', function(done) {
      sut.labelClicked();
      setTimeout(function() {
        sut.labelClicked();
        sut.isEditing.should.be.true();
        done();
      }, 10);
    });

    it('should not activate the edit mode when double clicked two slow > 350ms', function(done) {
      sut.labelClicked();
      setTimeout(function() {
        sut.labelClicked();
        sut.isEditing.should.be.false();
        done();
      }, 360);
    });

  });

  describe('when finishing edit mode', function() {
    it('should deactivate edit mode', function() {
      sut.isEditing = true;
      sut.finishEditing();
      sut.isEditing.should.be.false();
    });
  });

});
