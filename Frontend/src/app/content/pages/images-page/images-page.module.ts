import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImagesModule } from '../../component/images/images.module';
import { ImageListPageComponent } from './image-list-page/image-list-page.component';
import { ImageUploaderPageComponent } from './image-uploader-page/image-uploader-page.component';
import { ImagesPageComponent } from './images-page.component';

const routes: Routes = [
  {
    path: '',
    component: ImagesPageComponent,
    children: [
      {
        path: 'upload',
        component: ImageUploaderPageComponent,
      },
      {
        path: '',
        component: ImageListPageComponent,
        pathMatch: 'full',
      },
    ],
  },
];

@NgModule({
  declarations: [
    ImagesPageComponent,
    ImageListPageComponent,
    ImageUploaderPageComponent,
  ],
  imports: [CommonModule, RouterModule.forChild(routes), ImagesModule],
})
export class ImagesPageModule {}
