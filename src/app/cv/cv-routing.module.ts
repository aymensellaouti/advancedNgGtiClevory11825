import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from '../auth/guards/auth.guard';

import { CvComponent } from './cv/cv.component';


import { cvsResolverResolver } from './resolvers/cvs-resolver.resolver';

export const CvRoutes: Routes = [
  // Cv Routes
  {
    path: '',
    loadComponent: () => import('./add-cv/add-cv.component').then(m => m.CvComponent),
  },
  // cv/add
  { path: 'add', loadComponent: () => import('./add-cv/add-cv.component').then(m => m.AddCvComponent), canActivate: [authGuard] },
  {
    path: 'list',
    loadComponent: () => import('./master-details/master-details.component').then(m => m.MasterDetailsComponent),
    resolve: {
      cvs: cvsResolverResolver,
    },
    data: {
      roles: ['admin', 'user'],
    },
    children: [{ path: ':id', loadComponent: () => import('./details-cv/details-cv.component').then(m => m.DetailsCvComponent) }],
  },
  { path: ':id', loadComponent: () => import('./details-cv/details-cv.component').then(m => m.DetailsCvComponent) },
];

@NgModule({
  imports: [RouterModule.forChild(CvRoutes)],
  exports: [RouterModule],
})
export class CvRoutingModule {}
