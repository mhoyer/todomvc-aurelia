export class TodoItem {
  constructor(title) {
    this.isChecked = false;
    this.isEditing = false;
    this.lastLabelClick = 0;
    this.title = title.trim();
  }

  labelClicked() {
    var now = Date.now();
    var duration = now - this.lastLabelClick;

    if (duration < 350) this.isEditing = true;

    this.lastLabelClick = Date.now();
  }
}
