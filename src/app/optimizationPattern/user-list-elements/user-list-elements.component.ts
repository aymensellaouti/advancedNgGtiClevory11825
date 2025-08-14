import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { User } from '../users.service';
import { NgFor } from '@angular/common';
import { FiboPipe } from '../../pipes/fibo.pipe';


@Component({
    selector: 'app-user-list-elements',
    templateUrl: './user-list-elements.component.html',
    styleUrls: ['./user-list-elements.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [NgFor, FiboPipe]
})
export class UserListElementsComponent {
  @Input() users: User[] = [];
}
