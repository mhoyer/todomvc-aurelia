export class App {
  constructor() {
    this.todos = [];
    this.newTodo = null;
  }

  addNewTodo(newTodo = this.newTodo) {
    this.todos.push(newTodo);
    this.newTodo = null;
  }
}
