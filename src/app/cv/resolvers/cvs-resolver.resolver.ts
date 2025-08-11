import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { CvService } from '../services/cv.service';
import { Cv } from '../model/cv';

export const cvsResolverResolver: ResolveFn<Cv[]> = (route, state) => {
  const cvService = inject(CvService);
  return cvService.getCvs();
};
