import { Component, inject, OnDestroy } from "@angular/core";
import { Observable, Subject, Subscription, filter, map, takeUntil } from "rxjs";
import { ToastrService } from "ngx-toastr";
import { AsyncPipe } from "@angular/common";

@Component({
    selector: 'app-test-observable',
    templateUrl: './test-observable.component.html',
    styleUrls: ['./test-observable.component.css'],
    imports: [AsyncPipe]
})
export class TestObservableComponent implements OnDestroy {
  private toaster = inject(ToastrService);

  firstObservable$: Observable<number>;
  toastr = inject(ToastrService);
  countDown = 0;
  subbscription = new Subscription();
  signalSubject = new Subject<void>();
  constructor() {
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
    this.subbscription.add(
    this.firstObservable$
    .pipe(takeUntil(this.signalSubject))
    .subscribe({
      next: (data) => {
        console.log(data);
      },
    }));
    this.subbscription.add(
    this.firstObservable$.subscribe({
      next: (data) => {
        this.countDown = data;
      },
    }));
    setTimeout(() => {
      this.subbscription.add(this.firstObservable$.subscribe({
        next: (data) => {
          this.toaster.info('' + data);
        },
        complete: () => {
          this.toaster.error('BOOOOM :D');
        },
      }));
    }, 3000);
  }
  ngOnDestroy(): void {
    this.subbscription.unsubscribe();
    this.signalSubject.next();
    this.signalSubject.complete();
  }
}
