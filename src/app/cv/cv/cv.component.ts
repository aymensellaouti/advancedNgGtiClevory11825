import { Component, inject } from "@angular/core";
import { Cv } from "../model/cv";
import { LoggerService } from "../../services/logger.service";
import { ToastrService } from "ngx-toastr";
import { CvService } from "../services/cv.service";
import { EMPTY, Observable, catchError, of } from "rxjs";
import { TodoService } from "src/app/todo/service/todo.service";
import { ListComponent } from "../list/list.component";
import { CvCardComponent } from "../cv-card/cv-card.component";
import { EmbaucheComponent } from "../embauche/embauche.component";
import { AsyncPipe, UpperCasePipe, DatePipe } from "@angular/common";
@Component({
    selector: 'app-cv',
    templateUrl: './cv.component.html',
    styleUrls: ['./cv.component.css'],
    imports: [ListComponent, CvCardComponent, EmbaucheComponent, AsyncPipe, UpperCasePipe, DatePipe]
})
export class CvComponent {
  private logger = inject(LoggerService);
  private toastr = inject(ToastrService);
  private cvService = inject(CvService);

  cvs$: Observable<Cv[]> = this.cvService.getCvs().pipe(
    catchError(
      (e) => {
        this.toastr.error(`
          Attention!! Les données sont fictives, problème avec le serveur.
          Veuillez contacter l'admin.`);
        return of(this.cvService.getFakeCvs());
      }
    )
  );
  selectedCv$: Observable<Cv> = this.cvService.selectedCv$;
  /*   selectedCv: Cv | null = null; */
  date = new Date();
  todoService = inject(TodoService);

  constructor() {
    // this.cvService.getCvs().subscribe({
    //   next: (cvs) => {
    //     this.cvs = cvs;
    //   },
    //   error: () => {
    //     this.cvs = this.cvService.getFakeCvs();
    //     this.toastr.error(`
    //       Attention!! Les données sont fictives, problème avec le serveur.
    //       Veuillez contacter l'admin.`);
    //   },
    // });
    this.logger.logger('je suis le cvComponent');
    this.toastr.info('Bienvenu dans notre CvTech');
  }
  // onForwardCv(cv: Cv) {
  //   this.selectedCv = cv;
  // }
}
