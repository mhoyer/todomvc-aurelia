'use strict';
import {Focus} from 'src/behaviors/focus';

describe('Focus behavior', () => {
  var sut;
  var fakeElement = {};

  beforeEach(() => {
    sut = new Focus(fakeElement);
  });

  describe('when creating a new instance', () => {
    it('should simply do', () => {
      sut.should.not.be.null;
      sut.element.should.be.equal(fakeElement);
    });
  });

  describe('when the bound value changes', () => {
    beforeEach(() => {
      fakeElement.focus = sinon.spy();
    });

    it('should trigger focus on element if value is true', () => {
      sut.valueChanged(true);
      fakeElement.focus.should.have.been.calledOnce;
    });

    it('should not trigger focus on element if value is false', () => {
      sut.valueChanged(false);
      fakeElement.focus.should.not.have.been.called;
    });
  });
});
