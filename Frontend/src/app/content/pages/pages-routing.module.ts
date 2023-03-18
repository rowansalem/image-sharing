import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ErrorPageComponent } from './error-page/error-page.component';
import { PagesComponent } from './pages.component';

const routes: Routes = [
  {
    path: '404',
    component: ErrorPageComponent,
  },
  {
    path: '',
    component: PagesComponent,
    children: [
      {
        path: '',
        redirectTo: 'images',
        pathMatch: 'full',
      },
      {
        path: 'images',
        loadChildren: () =>
          import('./images-page/images-page.module').then((m) => m.ImagesPageModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],

  exports: [RouterModule],
})
export class PagesRoutingModule {}
