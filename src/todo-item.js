var ESC_KEY = 27;
var lastLabelClick = Symbol();

export class TodoItem {
  constructor(title) {
    this.isCompleted = false;
    this.isEditing = false;
    this.title = title.trim();
    this.editTitle = null;

    // private properties
    this[lastLabelClick] = 0;
  }

  labelClicked() {
    var now = Date.now();
    var duration = now - this[lastLabelClick];

    if (duration < 350) {
      this.editTitle = this.title;
      this.isEditing = true;
    }

    this[lastLabelClick] = Date.now();
  }

  finishEditing() {
    this.title = this.editTitle.trim();
    this.isEditing = false;
  }

  onKeyUp(ev) {
    if(ev.keyCode == ESC_KEY) {
      this.editTitle = this.title;
      this.isEditing = false;
    }
  }
}
