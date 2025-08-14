import { Component, OnInit, inject, input } from '@angular/core';
import { Cv } from '../model/cv';
import { CvService } from '../services/cv.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { APP_ROUTES } from '../../../config/routes.config';
import { AuthService } from '../../auth/services/auth.service';
import { catchError, EMPTY, Observable, switchMap } from 'rxjs';
import { AsyncPipe, JsonPipe } from '@angular/common';
import { DefaultImagePipe } from '../pipes/default-image.pipe';
import { httpResource } from '@angular/common/http';
import { API } from 'src/config/api.config';

@Component({
    selector: 'app-details-cv',
    templateUrl: './details-cv.component.html',
    styleUrls: ['./details-cv.component.css'],
    imports: [AsyncPipe, DefaultImagePipe, JsonPipe]
})
export class DetailsCvComponent implements OnInit {
  private cvService = inject(CvService);
  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);
  private toastr = inject(ToastrService);
  authService = inject(AuthService);
  id = input('id');
  cv$: Observable<Cv> = this.activatedRoute.params.pipe(
    switchMap((params) => this.cvService.getCvById(+params['id'])),
    catchError((e) => {
      this.router.navigate([APP_ROUTES.cv]);
      return EMPTY;
    })
  );

  cvHttpResource = httpResource(
    () => API.cv + this.id()
  )

  ngOnInit() {
    // this.activatedRoute.params.subscribe({
    //   next: (params) => {
    //     this.cvService.getCvById(+params['id']).subscribe({
    //       next: (cv) => {
    //         this.cv = cv;
    //       },
    //       error: (e) => {
    //         this.router.navigate([APP_ROUTES.cv]);
    //       },
    //     });
    //   }
    // })
  }
  deleteCv(cv: Cv) {
    this.cvService.deleteCvById(cv.id).subscribe({
      next: () => {
        this.toastr.success(`${cv.name} supprimé avec succès`);
        this.router.navigate([APP_ROUTES.cv]);
      },
      error: () => {
        this.toastr.error(
          `Problème avec le serveur veuillez contacter l'admin`
        );
      },
    });
  }
}
