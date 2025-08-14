import { Component, inject } from '@angular/core';
import { Todo } from '../model/todo';
import { TodoService } from '../service/todo.service';
import { CanLeave } from 'src/app/interfaces/can-leave.interface';

import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-todo',
    templateUrl: './todo.component.html',
    styleUrls: ['./todo.component.css'],
    providers: [TodoService],
    imports: [FormsModule]
})
export class TodoComponent implements CanLeave {
  private todoService = inject(TodoService);

  todos: Todo[] = [];
  todo = new Todo();
  constructor() {
    this.todos = this.todoService.getTodos();
  }
  canLeave(): boolean {
    return !this.todo.name.trim() && !this.todo.name.trim();
  }
  addTodo() {
    this.todoService.addTodo(this.todo);
    this.todo = new Todo();
  }

  deleteTodo(todo: Todo) {
    this.todoService.deleteTodo(todo);
  }
}
