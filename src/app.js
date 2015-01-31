export class App {
  constructor() {
    this.todos = [];
    this.newTodoTitle = null;
  }

  addNewTodo(title = this.newTodoTitle) {
    this.todos.push(title);
    this.newTodoTitle = null;
  }
}
