import {TodoItem} from './todo-item';

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
}
