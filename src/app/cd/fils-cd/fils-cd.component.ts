import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ConnectedUser } from 'src/app/auth/services/auth.service';

@Component({
    selector: 'app-fils-cd',
    templateUrl: './fils-cd.component.html',
    styleUrls: ['./fils-cd.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class FilsCdComponent {
  @Input()
  user!: ConnectedUser;
  @Input()
  name = '';
}
