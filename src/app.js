import {Todos} from './todos';

export class App {
  static inject() { return [Todos]; }

  constructor(todos) {
    this.todos = todos;
  }
}
