import { Component, computed, effect, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-som',
  imports: [FormsModule],
  templateUrl: './som.component.html',
  styleUrl: './som.component.css',
})
export class SomComponent {
  x = signal(5);
  y = signal(7);
  z = computed(() => this.x() + this.y());
  doubleZ = computed(() => 2 * this.z());

  #loggerEffect = effect(() => {
    console.log(this.doubleZ());
  })
}
