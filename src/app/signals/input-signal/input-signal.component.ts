import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IsEvenComponent } from '../is-even/is-even.component';

@Component({
    selector: 'app-input-signal',
    templateUrl: './input-signal.component.html',
    styleUrls: ['./input-signal.component.css'],
    imports: [FormsModule, IsEvenComponent]
})
export class InputSignalComponent {
  counter = 0;
}
