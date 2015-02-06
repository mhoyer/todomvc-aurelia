'use strict';

import {Focus} from 'src/behaviors/focus';

var expect = chai.expect;
var should = chai.should();

describe('Focus behavior', () => {
  var sut;

  describe('when creating a new instance', () => {
    it.skip('should simply do', () => {
      // following lines will break due to import of 'aurelia-templating' (and testing under node I guess):
      //
      // Potentially unhandled rejection [2] ReferenceError: Error loading "github:aurelia/templating@0.8.8" at file:~/jspm_packages/github/aurelia/templating@0.8.8.js
      // Error loading "github:aurelia/templating@0.8.8" from "src/behaviors/focus" at file:~/src/behaviors/focus.js
      //   window is not defined
      // at execute (evalmachine.<anonymous>:36:33)
      // at ensureEvaluated (~\jspm_packages\system.src.js:714:26)
      // at ensureEvaluated (~\jspm_packages\system.src.js:706:11)
      // at ensureEvaluated (~\jspm_packages\system.src.js:706:11)
      // at ensureEvaluated (~\jspm_packages\system.src.js:706:11)
      // at ensureEvaluated (~\jspm_packages\system.src.js:706:11)
      // at ensureEvaluated (~\jspm_packages\system.src.js:706:11)
      // at ensureEvaluated (~\jspm_packages\system.src.js:706:11)
      // at ensureEvaluated (~\jspm_packages\system.src.js:706:11)
      // at Object.execute (~\jspm_packages\system.src.js:844:11)

      var fakeElement = {};

      sut = new Focus(fakeElement);
      sut.should.not.be.null();
    });
  });
});
