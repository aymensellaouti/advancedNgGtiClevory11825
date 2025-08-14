import {Component, Input, Output, EventEmitter} from '@angular/core';
import {User} from "../users.service";
import { FormsModule } from '@angular/forms';
import { UserListElementsComponent } from '../user-list-elements/user-list-elements.component';


@Component({
    selector: 'app-user-list',
    templateUrl: './user-list.component.html',
    styleUrls: ['./user-list.component.css'],
    imports: [FormsModule, UserListElementsComponent]
})
export class UserListComponent {
  @Input() usersCluster: string = '';
  @Input() users: User[] = [];
  @Output() add = new EventEmitter<string>();
  userFullName: string = '';
  addUser() {
    this.add.emit(this.userFullName);
    this.userFullName = '';
  }

}
