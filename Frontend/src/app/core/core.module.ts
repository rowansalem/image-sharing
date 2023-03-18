import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './modules/material.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

@NgModule({
  declarations: [],
  exports: [MaterialModule, HttpClientModule],
  imports: [CommonModule, MaterialModule, HttpClientModule],
  providers: [],
})
export class CoreModule {}
