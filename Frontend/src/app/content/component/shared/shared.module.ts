import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MaterialModule } from 'src/app/core/modules/material.module';
import { LoaderWithBgComponent } from './loader-with-bg/loader-with-bg.component';
import { MatStepperModule } from '@angular/material/stepper';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import {
  MatPaginatorIntl,
  MatPaginatorModule,
} from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatSidenavModule } from '@angular/material/sidenav';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { CardComponent } from './card/card.component';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { ImageCropperModule } from 'ngx-image-cropper';
import { DocumentsDropzoneComponent } from './documents-dropzone/documents-dropzone.component';
import { ImageCropperComponent } from './image-cropper/image-cropper.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatSliderModule } from '@angular/material/slider';

@NgModule({
  declarations: [
    LoaderWithBgComponent,
    DocumentsDropzoneComponent,
    ImageCropperComponent,
    CardComponent,
  ],
  imports: [
    CommonModule,
    NgbModule,
    MaterialModule,
    MatStepperModule,
    MatDialogModule,
    MatTableModule,
    MatPaginatorModule,
    FormsModule,
    ReactiveFormsModule,
    MatSortModule,
    MatSidenavModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    NgxDropzoneModule,
    ImageCropperModule,
    MatSliderModule,
  ],
  exports: [
    LoaderWithBgComponent,
    CardComponent,
    CommonModule,
    MaterialModule,
    MatStepperModule,
    MatDialogModule,
    MatTableModule,
    MatPaginatorModule,
    FormsModule,
    ReactiveFormsModule,
    MatSortModule,
    MatSidenavModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ImageCropperComponent,
    DocumentsDropzoneComponent,
  ],
  entryComponents: [],
  providers: [],
})
export class SharedModule {}
