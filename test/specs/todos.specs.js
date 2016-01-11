'use strict';
import {Todos} from 'src/todos';

describe('Todos', () =>{
  var sut;
  var fakeStorage, fakeObserverLocator;

  beforeEach(() => {
    fakeObserverLocator = {
      getObserver: sinon.stub()
        .returns({
          subscribe: sinon.stub()
        })
    };

    fakeStorage = {
      getItem: sinon.stub(),
      setItem: sinon.stub()
    };

    sut = new Todos(fakeObserverLocator, fakeStorage);
  });

  describe('when creating a new instance', () => {
    it('should init empty list of todo items', () => {
      sut.items.should.be.empty;
    });

    it('should init new todo field with empty value', () => {
      expect(sut.newTodoTitle).to.be.null;
    });

    it('should not have any item left to be done', () => {
      sut.countTodosLeft.should.be.equal(0);
    });

    it('should set empty filter (all)', () => {
      sut.filter.should.be.empty;
    });

    it('should not filter any item', () => {
      sut.filteredItems.should.be.empty;
    });

    it('should load the items from local storage', () => {
      // we should actually test for .load() gets called. But not easy when the ctor does the call.
      fakeStorage.getItem.reset();

      new Todos(fakeObserverLocator, fakeStorage);

      fakeStorage.getItem.should.have.been.calledOnce;
      fakeStorage.getItem.should.have.been.calledWith('todomvc-aurelia');
    });
  });

  describe('when loading todos from local storage', () => {
    it('should use correct key', () => {
      sut.load();

      fakeStorage.getItem.should.have.been.calledWith('todomvc-aurelia');
    });

    it('should set empty list of todo items if nothing was saved before', () => {
      sut.load();

      sut.items.should.be.empty;
    });

    it('should fill list of todo items from persisted simplified list', () => {
      fakeStorage.getItem
        .returns('[{"title":"foo","completed":false},' +
                  '{"title":"bar","completed":true}]');

      sut.load();

      sut.items.should.have.length(2);
      sut.items[0].title.should.be.equal('foo');
      sut.items[0].isCompleted.should.be.false;
      sut.items[1].title.should.be.equal('bar');
      sut.items[1].isCompleted.should.be.true;
    });

    it('should activate are-all-checked state', (done) => {
      fakeStorage.getItem
        .returns('[{"title":"foo","completed":true}]');

      sut.load();

      setTimeout(() => {
        sut.areAllChecked.should.be.true;
        done();
      }, 10);
    });
  });

  describe('when activating the todo view model', () => {
    it('should update the filtered items', () => {
      sut.updateFilteredItems = sinon.spy();

      sut.activate({ filter: 'active' });

      sut.updateFilteredItems.should.have.been.calledOnce;
      sut.updateFilteredItems.should.have.been.calledWith('active');
    });

    it('should reset the filtered items if nothing is passed in', () => {
      sut.updateFilteredItems = sinon.spy();

      sut.activate({});

      sut.updateFilteredItems.should.have.been.calledOnce;
      sut.updateFilteredItems.should.have.been.calledWith(undefined);
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
      expect(sut.newTodoTitle).to.be.null;
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

      sut.updateFilteredItems.should.have.been.calledOnce;
      sut.updateFilteredItems.should.have.been.calledWith('active');
    });

    it('should save the list of todo items', () => {
      sut.save = sinon.spy();

      sut.addNewTodo("foo");

      sut.save.should.have.been.calledOnce;
    });
  });

  describe('when deleting a todo item', () => {
    var fakeTodo = new Object();

    beforeEach(() => {
      sut.items.push(fakeTodo);
    });

    it('should remove it from the list of todo items', () => {
      sut.deleteTodo(fakeTodo);
      sut.items.should.be.empty;
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

      sut.updateFilteredItems.should.have.been.calledOnce;
      sut.updateFilteredItems.should.have.been.calledWith('active');
    });

    it('should save the list of todo items', () => {
      sut.save = sinon.spy();

      sut.deleteTodo(fakeTodo);

      sut.save.should.have.been.calledOnce;
    });
  });

  describe('with two items given', () => {
    beforeEach((done) => {
      sut.addNewTodo("foo");
      sut.addNewTodo("bar");
      sut.items[1].isCompleted = true;

      setTimeout(done, 10);
    });

    describe('when adding a new todo', () => {
      it('should reset are-all-checked state', (done) => {
        sut.areAllChecked = true;

        sut.addNewTodo("foo");

        setTimeout(() => {
          sut.areAllChecked.should.be.false;
          done();
        }, 10);
      });
    });

    describe('when deleting a todo', () => {
      it('should reset are-all-checked state', (done) => {
        sut.areAllChecked = false;

        sut.deleteTodo(sut.items[0]);

        setTimeout(() => {
          sut.areAllChecked.should.be.true;
          done();
        }, 10);
      });
    });

    describe('when changing checked state for all todo items', () => {
      it('should check all todo items', () => {
        sut.areAllChecked = true;
        sut.onToggleAllChanged();

        sut.items[0].isCompleted.should.be.true;
        sut.items[1].isCompleted.should.be.true;
      });

      it('should uncheck all todo items', () => {
        sut.areAllChecked = false;
        sut.onToggleAllChanged();

        sut.items[0].isCompleted.should.be.false;
        sut.items[1].isCompleted.should.be.false;
      });

      it('should update the filtered list of todo items', () => {
        sut.updateFilteredItems = sinon.spy();

        sut.areAllChecked = true;
        sut.onToggleAllChanged();

        sut.updateFilteredItems.should.have.been.called;
      });

      it('should set current are-all-checked state', () => {
        sut.areAllChecked = true;
        sut.onToggleAllChanged();

        sut.areAllChecked.should.be.true;
      });
    });

    describe('when editing a todo item', () => {
      it('should delete it if title set empty', (done) => {
        sut.deleteTodo = sinon.spy();

        sut.items[0].title = '';
        sut.onTitleChanged(sut.items[0]);

        setTimeout(() => {
          sut.deleteTodo.should.have.been.calledWith(sut.items[0]);
          done();
        }, 10);
      });

      it('should not delete it if title got valid content', (done) => {
        sut.deleteTodo = sinon.spy();

        sut.items[0].title = 'baz';

        setTimeout(() => {
          sut.deleteTodo.should.not.have.been.called;
          done();
        }, 10);
      });

      it('should not update filtered list of todo items on label double click', (done) => {
        sut.filter = 'active';
        sut.updateFilteredItems = sinon.spy();

        sut.items[0].labelDoubleClicked();

        setTimeout(() => {
          sut.updateFilteredItems.should.not.have.been.calledOnce;
          done();
        }, 20);
      });
    });

    describe('when setting a todo item to completed state', () => {
      it('should update the filtered list of todo items', (done) => {
        sut.filter = 'active';
        sut.updateFilteredItems = sinon.spy();

        sut.items[0].isCompleted = true;
        sut.onIsCompletedChanged();

        setTimeout(() => {
          sut.updateFilteredItems.should.have.been.calledOnce;
          done();
        }, 10);
      });

      it('should reset are-all-checked state', (done) => {
        sut.areAllChecked = true;

        sut.items[1].isCompleted = false;
        sut.onIsCompletedChanged();

        setTimeout(() => {
          sut.areAllChecked.should.be.false;
          done();
        }, 10);
      });

      it('should activate are-all-checked state if all todo items were checked manually', (done) => {
        sut.areAllChecked = false;

        sut.items[0].isCompleted = true;
        sut.onIsCompletedChanged();
        sut.items[1].isCompleted = true;
        sut.onIsCompletedChanged();

        setTimeout(() => {
          sut.areAllChecked.should.be.true;
          done();
        }, 10);
      });

      it('should not uncheck all items when unchecking one item after all were checked', (done) => {
        sut.areAllChecked = true;

        sut.items[0].isCompleted = false;

        setTimeout(() => {
          sut.items[0].isCompleted.should.be.false;
          sut.items[1].isCompleted.should.be.true; // still
          done();
        }, 10);
      });
    });

    describe('when the title changes on a todo item instance', () => {
      it('should save the list of todo items', () => {
        sut.save = sinon.spy();

        sut.onTitleChanged(sut.items[0]);

        sut.save.should.have.been.calledOnce;
      });
    });

    describe('when the completed state changes on a todo item instance', () => {
      it('should save the list of todo items', () => {
        sut.save = sinon.spy();

        sut.onIsCompletedChanged();

        sut.save.should.have.been.calledOnce;
      });
    });

    describe('when counting incompleted todos', () => {
      it('should calculate the total of items left for doing', () => {
        sut.countTodosLeft.should.be.equal(1);
      });

      it('should restore count of items left for doing when unchecking', () => {
        sut.items[1].isCompleted = false;
        sut.countTodosLeft.should.be.equal(2);
      });
    });

    describe('when filtering the list of todo items', () => {
      it('should set the current filter', () => {
        sut.updateFilteredItems("active");

        sut.filter.should.equal("active")
      });

      it('should set the filter to ! if passed in argument is undefined', () => {
        sut.updateFilteredItems(undefined);

        sut.filter.should.equal("!")
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

        sut.updateFilteredItems.should.have.been.calledOnce;
        sut.updateFilteredItems.should.have.been.calledWith('active');
      });

      it('should reset current are-all-checked state', () => {
        sut.areAllChecked = true;

        sut.clearCompletedTodos();

        sut.areAllChecked.should.be.false;
      });

      it('should save the list of todo items', () => {
        sut.save = sinon.spy();

        sut.clearCompletedTodos();

        sut.save.should.have.been.calledOnce;
      });
    });

    describe('when saving the list of todo items', () => {
      it('should write a simplified list to local storage', () => {
        sut.save();

        fakeStorage.setItem.should.have.been.calledWith('todomvc-aurelia',
          '[{"title":"foo","completed":false},' +
           '{"title":"bar","completed":true}]');
      });
    });
  });

});
