import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

import { PagesComponent } from './pages.component';
import { PagesRoutingModule } from './pages-routing.module';
import { ErrorPageComponent } from './error-page/error-page.component';
import { CommonModule } from '@angular/common';
import { LayoutModule } from '../layout/layout.module';
import { MaterialModule } from '../../core/modules/material.module';
import { ImageUploaderPageComponent } from './images-page/image-uploader-page/image-uploader-page.component';
import { ImagesPageModule } from './images-page/images-page.module';

@NgModule({
  declarations: [PagesComponent, ErrorPageComponent],
  imports: [
    PagesRoutingModule,
    MaterialModule,
    LayoutModule,
    TranslateModule,
    CommonModule,
    ImagesPageModule,
  ],
  providers: [],
})
export class PagesModule {}
