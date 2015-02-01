'use strict';

var system = require('../../jspm_packages/system.js');
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

      it('should init empty list of todos', function() {
        sut.todos.should.be.empty();
      });

      it('should init new todo field with empty value', function() {
        expect(sut.newTodoTitle).to.be.null();
      });

      it('should not have any item left to be done', function() {
        sut.countTodosLeft.should.be.equal(0);
      });

    });

    describe('when adding a new todo', function() {

      it('should add it to the list of todos', function() {
        sut.addNewTodo("foo");
        sut.todos[0].title.should.equal("foo");
      });

      it('should add current newTodo value if nothing passed into function', function() {
        sut.newTodoTitle = "foo";
        sut.addNewTodo();
        sut.todos[0].title.should.equal("foo");
      });

      it('should reset new todo field back to empty', function() {
        sut.newTodoTitle = "foo";
        sut.addNewTodo("foo");
        expect(sut.newTodoTitle).to.be.null();
      });

      it('should increase count of items left', function() {
        sut.newTodoTitle = "foo";
        sut.addNewTodo("foo");
        sut.countTodosLeft.should.be.equal(1);
      });

    });

    describe('when deleting a todo', function() {
      var fakeTodo = new Object();

      beforeEach(function() {
        sut.todos.push(fakeTodo);
      });

      it('should remove it from the list of todos', function() {
        sut.deleteTodo(fakeTodo);
        sut.todos.should.be.empty();
      });

      it('should be fail safe when trying to remove not existing item from the list of todos', function() {
        sut.deleteTodo(new Object());
        sut.todos.should.contain(fakeTodo);
      });

      it('should decrease count of items left', function() {
        sut.deleteTodo(fakeTodo);
        sut.countTodosLeft.should.be.equal(0);
      });
    });

    describe('when checking a todo as done', function() {
      it('should decrease count of items left for doing', function() {
        sut.addNewTodo("foo");
        sut.todos[0].isChecked = true;
        sut.countTodosLeft.should.be.equal(0);
      });
    });

});
