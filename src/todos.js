import {TodoItem} from './todo-item';
import _ from 'underscore';

export class Todos {
  constructor() {
    this.filter = undefined;
    this.items = [];
    this.newTodoTitle = null;
  }

  activate(params) {
    this.filter = params.filter;
  }

  addNewTodo(title = this.newTodoTitle) {
    var newTodoItem = new TodoItem(title);
    this.items.push(newTodoItem);
    this.newTodoTitle = null;
  }

  deleteTodo(todoItem) {
    var index = this.items.indexOf(todoItem);
    if (index < 0) return;

    this.items.splice(index, 1);
  }

  get countTodosLeft() {
    return _(this.items).filter(i => !i.isChecked).length;
  }
}
