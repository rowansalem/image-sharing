import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ImageCroppedEvent, ImageTransform } from 'ngx-image-cropper';

@Component({
  selector: 'app-image-cropper',
  templateUrl: './image-cropper.component.html',
})
export class ImageCropperComponent implements OnInit {

  // Main properties
  formData: FormData;

  // Inputs
  @Input() logoFile;
  @Input() logoUrl;
  @Input() stringUrl;
  @Input() hasLogo;

  // Outputs
  @Output() cropUpdate = new EventEmitter();

  // Logo config
  logoReady: boolean = true;
  logoCropped: any;
  logoSaved: boolean = false;
  croppedImage: any = '';

  // Cropper config
  imageChangedEvent: any;
  containWithinAspectRatio = true;
  transform: ImageTransform = {};
  scale = 1;
  max = 3;
  min = 0;
  showCropper = false;

  constructor() { }

  ngOnInit(): void {
    this.formData = new FormData();
    
  }

  // cropper methods
  viewLogo() {
    if(this.logoFile) {
      const file = this.dataURLtoFile(this.stringUrl, this.logoFile.name);
      this.logoFile = file;
    }
  }
  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
  }
  cancelCropping() {
    this.logoReady = true;
  }
  applyCropping() {
    this.logoReady = true;
    this.logoUrl = this.croppedImage;
    this.cropUpdate.emit(this.logoUrl);
  }
  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
    const file = this.dataURLtoFile(event.base64, this.logoFile);
    this.formData.delete('file');
    this.formData.append('file', file, this.logoFile);
  }
  dataURLtoFile(dataurl, filename) {
    let arr = dataurl.split(','),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]),
      n = bstr.length,
      u8arr = new Uint8Array(n);

    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }

    return new File([u8arr], filename, { type: mime });
  }
  imageLoaded() {
    this.showCropper = true;
  }


  // Logo scaling methods
  cropLogo() {
    this.logoReady = false;
  }
  zoomOut() {
    this.scale -= .1;
    this.transform = {
      ...this.transform,
      scale: this.scale
    };
  }
  zoomIn() {
    this.scale += .1;
    this.transform = {
      ...this.transform,
      scale: this.scale
    };
  }
  updateScale(event) {
    this.scale = event.value;
    this.transform = {
      ...this.transform,
      scale: this.scale
    };
  }

}
