export class TodoItem {
  constructor(title) {
    this.isChecked = false;
    this.isEditing = false;
    this.title = title.trim();
  }
}
