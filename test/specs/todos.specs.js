'use strict';

import {Todos} from 'src/todos';

var expect = chai.expect;
var should = chai.should();

describe('Todos', () =>{
  var sut;

  beforeEach(() => {
    sut = new Todos();
  });

  describe('when creating a new instance', () => {
    it('should init empty list of todo items', () => {
      sut.items.should.be.empty();
    });

    it('should init new todo field with empty value', () => {
      expect(sut.newTodoTitle).to.be.null();
    });

    it('should not have any item left to be done', () => {
      sut.countTodosLeft.should.be.equal(0);
    });

    it('should set empty filter (all)', () => {
      sut.filter.should.be.empty();
    });

    it('should not filter any item', () => {
      sut.filteredItems.should.be.empty();
    });
  });

  describe('when activating the todo view model', () => {
    it('should update the filtered items', () => {
      sut.updateFilteredItems = sinon.spy();

      sut.activate({ filter: 'active' });

      assert(sut.updateFilteredItems.calledOnce);
      assert(sut.updateFilteredItems.calledWith('active'));
    });

    it('should reset the filtered items if non is passed in', () => {
      sut.updateFilteredItems = sinon.spy();

      sut.activate({});

      assert(sut.updateFilteredItems.calledOnce);
      assert(sut.updateFilteredItems.calledWith(undefined));
    });
  });

  describe('when adding a new todo', () => {
    it('should add it to the list of todo items', () => {
      sut.addNewTodo("foo");
      sut.items[0].title.should.equal("foo");
    });

    it('should trim the title', () => {
      sut.addNewTodo("    foo     ");
      sut.items[0].title.should.equal("foo");
    });

    it('should not add the item if title is empty', () => {
      sut.addNewTodo("");
      sut.items.length.should.be.equal(0);
    });

    it('should not add the item if title only has whitespaces', () => {
      sut.addNewTodo("   ");
      sut.items.length.should.be.equal(0);
    });

    it('should add current newTodo value if nothing passed into function', () => {
      sut.newTodoTitle = "foo";
      sut.addNewTodo();
      sut.items[0].title.should.equal("foo");
    });

    it('should reset new todo field back to empty', () => {
      sut.newTodoTitle = "foo";
      sut.addNewTodo("foo");
      expect(sut.newTodoTitle).to.be.null();
    });

    it('should increase count of items left', () => {
      sut.newTodoTitle = "foo";
      sut.addNewTodo("foo");
      sut.countTodosLeft.should.be.equal(1);
    });

    it('should update the filtered list of todo items', () => {
      sut.updateFilteredItems = sinon.spy();
      sut.filter = 'active';

      sut.addNewTodo("foo");

      assert(sut.updateFilteredItems.calledOnce);
      assert(sut.updateFilteredItems.calledWith('active'));
    });
  });

  describe('when deleting a todo', () => {
    var fakeTodo = new Object();

    beforeEach(() => {
      sut.items.push(fakeTodo);
    });

    it('should remove it from the list of todo items', () => {
      sut.deleteTodo(fakeTodo);
      sut.items.should.be.empty();
    });

    it('should be fail safe when trying to remove not existing item from the list of todo items', () => {
      sut.deleteTodo(new Object());
      sut.items.should.contain(fakeTodo);
    });

    it('should decrease count of items left', () => {
      sut.deleteTodo(fakeTodo);
      sut.countTodosLeft.should.be.equal(0);
    });

    it('should update the filtered list of todo items', () => {
      sut.updateFilteredItems = sinon.spy();
      sut.filter = 'active';

      sut.deleteTodo(fakeTodo);

      assert(sut.updateFilteredItems.calledOnce);
      assert(sut.updateFilteredItems.calledWith('active'));
    });
  });

  describe('with two items given', () => {
    beforeEach(() => {
      sut.addNewTodo("foo");
      sut.addNewTodo("bar");
      sut.items[1].isChecked = true;
    });

    describe('when counting incompleted todos', () => {
      it('should calculate the total of items left for doing', () => {
        sut.countTodosLeft.should.be.equal(1);
      });

      it('should restore count of items left for doing when unchecking', () => {
        sut.items[1].isChecked = false;
        sut.countTodosLeft.should.be.equal(2);
      });
    });

    describe('when filtering the list of todo items', () => {
      it('should set the current filter', () => {
        sut.updateFilteredItems("active");

        sut.filter.should.equal("active")
      });

      it('should hide completed todo items from the list', () => {
        sut.updateFilteredItems("active");

        sut.filteredItems.should.have.length(1);
        sut.filteredItems[0].title.should.equal("foo")
      });

      it('should hide active todo items from the list', () => {
        sut.updateFilteredItems("completed");

        sut.filteredItems.should.have.length(1);
        sut.filteredItems[0].title.should.equal("bar")
      });

      it('should not hide any todo item if filter is invalid', () => {
        sut.updateFilteredItems("not-supported");

        sut.filteredItems.should.have.length(2);
      });
    });

    describe('when clearing the list of completed todo items', () => {
      it('should delete the completed todo items only', () => {
        sut.clearCompletedTodos();

        sut.items.should.have.length(1);
        sut.items[0].title.should.equal("foo")
      });

      it('should update the filtered list of todo items', () => {
        sut.updateFilteredItems = sinon.spy();
        sut.filter = 'active';

        sut.clearCompletedTodos();

        assert(sut.updateFilteredItems.calledOnce);
        assert(sut.updateFilteredItems.calledWith('active'));
      });
    });
  });

});
