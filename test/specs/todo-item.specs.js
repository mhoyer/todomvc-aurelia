'use strict';
import {TodoItem} from 'src/todo-item';

describe('TodoItem', () => {
  var sut;

  beforeEach(() => {
    sut = new TodoItem("foo");
  });

  describe('when creating a new instance', () => {
    it('should not mark the item as done', () => {
      sut.isCompleted.should.be.false();
    });

    it('should set given title', () => {
      sut.title.should.equal("foo");
    });

    it('should trim given title', () => {
      sut = new TodoItem("   foo   ");
      sut.title.should.equal("foo");
    });

    it('should not activate the edit mode', () => {
      sut.isEditing.should.be.false();
    });

    it('should have unset edit title', () => {
      expect(sut.editTitle).to.be.null();
    });
  });

  describe('when double clicking an item', () => {
    it('should not set the edit mode when clicked only once', () => {
      sut.labelClicked();
      sut.isEditing.should.be.false();
    });

    // uuuh, not the best way to test time related stuff?
    it('should activate the edit mode when double clicked within e.g. 50ms', (done) => {
      sut.labelClicked();
      setTimeout(() => {
        sut.labelClicked();
        sut.isEditing.should.be.true();
        done();
      }, 10);
    });

    it('should update edit title with current todo title', () => {
      sut.editTitle = "";
      sut.title = "foo";

      sut.labelClicked();
      sut.labelClicked();

      sut.editTitle.should.be.equal("foo");
    });

    it('should not activate the edit mode when double clicked two slow > 350ms', (done) => {
      sut.labelClicked();
      setTimeout(() => {
        sut.labelClicked();
        sut.isEditing.should.be.false();
        done();
      }, 360);
    });
  });

  describe('while editing', () => {
    beforeEach(() => {
      sut.isEditing = true;
    });

    describe('when finishing edit mode', () => {
      it('should deactivate edit mode', () => {
        sut.editTitle = "foo";

        sut.finishEditing();

        sut.isEditing.should.be.false();
      });

      it('should update actual title with edit title', () => {
        sut.editTitle = "foo";

        sut.finishEditing();

        sut.title.should.be.equal("foo");
      });

      it('should trim modified title', () => {
        sut.editTitle = "   foo   ";

        sut.finishEditing();

        sut.title.should.be.equal("foo");
      });
    });

  });
});
