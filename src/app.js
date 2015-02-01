import {Router} from 'aurelia-router';
import {Todos} from './todos';

export class App {
  static inject() { return [Router, Todos]; }

  constructor(router, todos) {
    this.router = router;
    this.todos = todos;

    this.router.configure(cfg => { });
  }
}
