'use strict';
import {TodoItem} from 'src/todo-item';

describe('TodoItem', () => {
  var sut;

  beforeEach(() => {
    sut = new TodoItem("foo");
  });

  describe('when creating a new instance', () => {
    it('should not mark the item as done', () => {
      sut.isCompleted.should.be.false;
    });

    it('should set given title', () => {
      sut.title.should.equal("foo");
    });

    it('should trim given title', () => {
      sut = new TodoItem("   foo   ");
      sut.title.should.equal("foo");
    });

    it('should not activate the edit mode', () => {
      sut.isEditing.should.be.false;
    });

    it('should have unset edit title', () => {
      expect(sut.editTitle).to.be.null;
    });
  });

  describe('when double clicking an item', () => {
    it('should activate the edit mode when double clicked', () => {
      sut.labelDoubleClicked();
      sut.isEditing.should.be.true;
    });

    it('should update edit title with current todo title', () => {
      sut.editTitle = "";
      sut.title = "foo";

      sut.labelDoubleClicked();

      sut.editTitle.should.be.equal("foo");
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

        sut.isEditing.should.be.false;
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

    describe('when pressing a key', () => {
      it('should not finish editing mode when usual letter key pressed', () => {
        sut.finishEditing = sinon.spy();

        sut.onKeyUp({keyCode: 65});

        sut.finishEditing.should.not.have.been.called;
        sut.isEditing.should.be.true;
      });

      it('should finish editing mode when ESC pressed', () => {
        sut.finishEditing = sinon.spy();

        sut.onKeyUp({keyCode: 27});

        sut.finishEditing.should.not.have.been.called;
        sut.isEditing.should.be.false;
      });

      it('should not update title when ESC pressed', () => {
        sut.title = "foo";
        sut.editTitle = "bar";

        sut.onKeyUp({keyCode: 27});

        sut.title.should.be.equal("foo");
      });

      it('should set edit title back to actual title when pressing ESC', () => {
        // required due to blur listener that triggers finisheEditing()
        sut.title = "foo";
        sut.editTitle = "bar";

        sut.onKeyUp({keyCode: 27});

        sut.editTitle.should.be.equal("foo");
      });
    });
  });
});
