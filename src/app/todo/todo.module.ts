import { NgModule } from "@angular/core";
import { TodoComponent } from "./todo/todo.component";
import { WeekTodoComponent } from "./week-todo/week-todo.component";
import { TodoRoutingModule } from "./todo-routing.module";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";


@NgModule({
    // chneya iest7a9 el module Hadha
    imports: [TodoRoutingModule, FormsModule, CommonModule, TodoComponent, WeekTodoComponent],
    providers: [],
    exports: []
})
export default class TodoModule {}
