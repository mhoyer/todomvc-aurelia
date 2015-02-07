import {TodoItem} from './todo-item';
import _ from 'underscore';

export class Todos {
  constructor() {
    this.items = [];
    this.filteredItems = [];
    this.filter = '';
    this.newTodoTitle = null;
    this._areAllChecked = false;
  }

  activate(params) {
    this.updateFilteredItems(params.filter);
  }

  addNewTodo(title = this.newTodoTitle) {
    if (title == undefined) return;

    title = title.trim();
    if (title.length == 0) return;

    var newTodoItem = new TodoItem(title);
    Object.observe(newTodoItem, () => this.updateFilteredItems(this.filter));

    this.items.push(newTodoItem);
    this.newTodoTitle = null;
    this.updateFilteredItems(this.filter);
  }

  deleteTodo(todoItem) {
    this.items = _(this.items).without(todoItem);
    this.updateFilteredItems(this.filter);
  }

  get areAllChecked() { return this._areAllChecked; }
  set areAllChecked(checkedState) {
    this._areAllChecked = checkedState;
    _.each(this.items, i => i.isChecked = checkedState);
    this.updateFilteredItems(this.filter);
  }

  clearCompletedTodos() {
    this.items = _(this.items).filter(i => !i.isChecked);
    this._areAllChecked = false;
    this.updateFilteredItems(this.filter);
  }

  get countTodosLeft() {
    return _(this.items).filter(i => !i.isChecked).length;
  }

  updateFilteredItems(filter) {
    this.filter = filter;

    switch(filter) {
      case 'active':
        this.filteredItems = _(this.items).filter(i => !i.isChecked);
        break;
      case 'completed':
        this.filteredItems = _(this.items).filter(i =>  i.isChecked);
        break;
      default:
        this.filteredItems = this.items;
        break;
    }
  }
}
