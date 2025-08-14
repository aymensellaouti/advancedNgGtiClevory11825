import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from '../auth/guards/auth.guard';
import { AddCvComponent } from './add-cv/add-cv.component';
import { CvComponent } from './cv/cv.component';
import { DetailsCvComponent } from './details-cv/details-cv.component';
import { MasterDetailsComponent } from './master-details/master-details.component';
import { cvsResolverResolver } from './resolvers/cvs-resolver.resolver';

export const CvRoutes: Routes = [
  // Cv Routes
  {
    path: 'cv',
    component: CvComponent,
  },
  // cv/add
  { path: 'cv/add', component: AddCvComponent, canActivate: [authGuard] },
  {
    path: 'cv/list',
    component: MasterDetailsComponent,
    resolve: {
      cvs: cvsResolverResolver,
    },
    data: {
      roles: ['admin', 'user'],
    },
    children: [{ path: ':id', component: DetailsCvComponent }],
  },
  { path: 'cv/:id', component: DetailsCvComponent },
];

@NgModule({
  imports: [RouterModule.forChild(CvRoutes)],
  exports: [RouterModule],
})
export class CvRoutingModule {}
