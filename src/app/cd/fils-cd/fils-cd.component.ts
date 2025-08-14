import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ConnectedUser } from 'src/app/auth/services/auth.service';
import { JsonPipe } from '@angular/common';

@Component({
    selector: 'app-fils-cd',
    templateUrl: './fils-cd.component.html',
    styleUrls: ['./fils-cd.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [JsonPipe]
})
export class FilsCdComponent {
  @Input()
  user!: ConnectedUser;
  @Input()
  name = '';
}
