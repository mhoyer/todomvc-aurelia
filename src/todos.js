import {TodoItem} from './todo-item';
import _ from 'underscore';

export class Todos {
  constructor() {
    this.items = [];
    this.filteredItems = [];
    this.filter = '';
    this.newTodoTitle = null;
  }

  activate(params) {
    this.updateFilteredItems(params.filter);
  }

  addNewTodo(title = this.newTodoTitle) {
    if (title == undefined) return;

    title = title.trim();
    if (title.length == 0) return;

    var newTodoItem = new TodoItem(title);
    this.items.push(newTodoItem);
    this.newTodoTitle = null;
  }

  deleteTodo(todoItem) {
    this.items = _(this.items).without(todoItem);
  }

  clearCompletedTodos() {
    this.items = _(this.items).filter(i => !i.isChecked);
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
