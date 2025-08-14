import { Component } from '@angular/core';
import { ConnectedUser } from 'src/app/auth/services/auth.service';
import { FormsModule } from '@angular/forms';
import { FilsCdComponent } from '../fils-cd/fils-cd.component';

@Component({
    selector: 'app-pere-cd',
    templateUrl: './pere-cd.component.html',
    styleUrls: ['./pere-cd.component.css'],
    imports: [FormsModule, FilsCdComponent]
})
export class PereCdComponent {
  user: ConnectedUser = {
    email: 'aymen@gmail.com',
    id: 1,
  };

  name = 'sellaouti';

  updateUser(newEmail: string) {
    this.user = {...this.user, email:newEmail};
  }
}
