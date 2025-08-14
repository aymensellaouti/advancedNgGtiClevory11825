import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { TodoComponent } from "./todo/todo.component";
import { canLeaveGuard } from "../guards/can-leave.guard";

const TodoRoutes: Routes = [
        { path: "todo", component: TodoComponent, canDeactivate: [canLeaveGuard] },

];

@NgModule({
  imports: [RouterModule.forChild(TodoRoutes)],
  exports: [RouterModule],
})
export class TodoRoutingModule {}
