import { Component, inject, OnDestroy } from "@angular/core";
import { Observable, Subscription, filter, map } from "rxjs";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-test-observable",
  templateUrl: "./test-observable.component.html",
  styleUrls: ["./test-observable.component.css"],
})
export class TestObservableComponent {
  firstObservable$: Observable<number>;
  toastr = inject(ToastrService);
  countDown = 0;
  constructor(private toaster: ToastrService) {
    this.firstObservable$ = new Observable((observer) => {
      let i = 5;
      const intervalIndex = setInterval(() => {
        if (!i) {
          observer.complete();
          clearInterval(intervalIndex);
        } else {
          observer.next(i--);
        }
      }, 1000);
    });

    this.firstObservable$.subscribe({
      next: (data) => {
        console.log(data);
      }
    });
    this.firstObservable$.subscribe({
      next: (data) => {
        this.countDown = data;
      }
    });
    setTimeout(() => {
      this.firstObservable$.subscribe({
        next: (data) => {
          this.toaster.info('' + data);
        },
        complete: () => {
          this.toaster.error('BOOOOM :D');
        }
      });
    }, 3000)
  }
}
