import {TodoItem} from './todo-item';
import _ from '../jspm_packages/npm/underscore@1.7.0/underscore';
// import _ from 'underscore'; // << would like to see this instead of 

export class App {
  constructor() {
    this.todos = [];
    this.newTodoTitle = null;
  }

  addNewTodo(title = this.newTodoTitle) {
    var newTodoItem = new TodoItem(title);
    this.todos.push(newTodoItem);
    this.newTodoTitle = null;
  }

  deleteTodo(todoItem) {
    var index = this.todos.indexOf(todoItem);
    if (index < 0) return;

    this.todos.splice(index, 1);
  }

  get countTodosLeft() {
    return _(this.todos).filter(i => !i.isChecked).length;
  }
}
