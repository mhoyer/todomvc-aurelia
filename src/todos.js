import {TodoItem} from './todo-item';
import _ from '../jspm_packages/npm/underscore@1.7.0/underscore';
// import _ from 'underscore'; // << would like to see this instead of

export class Todos {
  constructor() {
    this.items = [];
    this.newTodoTitle = null;
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
