import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { Image } from 'src/app/core/models/images/image';
import { FileService } from 'src/app/core/services/file.service';
import { LoaderService } from 'src/app/core/services/shared/loader.service';

@Component({
  selector: 'app-image-uploader',
  templateUrl: './image-uploader.component.html',
  styleUrls: ['./image-uploader.component.scss'],
})
export class ImageUploaderComponent implements OnInit {
  @Output() changeLayout = new EventEmitter<boolean>();
  @Output() fileMeta = new EventEmitter<Image>();
  @Output() goToTab = new EventEmitter();
  @ViewChild('myForm') myForm: NgForm;
  @ViewChild('formElement') formElement: ElementRef;
  orgId: string;
  refresh = new EventEmitter<boolean>();
  logoFile = null;
  logoUrl = null;
  deleteDisabled = false;
  closedBtn = false;
  uploadFailed: boolean = false;
  isUploaded = false;
  isImage: boolean = true;
  fileUrl: SafeResourceUrl = null;
  uploadedFile = null;
  FileName: string = '';
  FileDescription: string = '';
  document: Image = new Image();
  documentsUploaded: Array<Image> = [];
  formData: FormData = new FormData();
  externalId: string = '';
  showMsg: boolean = false;
  errorNumber: number = 0;
  stringUrl = '';

  showCropper = false;

  getBase64FromFile: any;
  croppedImage: any = '';
  logoReady: boolean = true;
  logoCropped: any;
  logoSaved: boolean = false;
  saved: boolean = false;
  unsaved: boolean = false;

  dataLength = 0;
  pageLength = 15;
  pageSize = 15;
  pageNumber = 0;

  documents: Array<Image> = [];

  imageURL?: any;

  constructor(
    private sanitizer: DomSanitizer,
    private router: Router,
    private fileService: FileService,
    public loaderService: LoaderService,
    private cdf: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.formData = new FormData();
    this.changeLayout.emit(this.isUploaded);
  }

  addDocument(event) {
    if (event) {
      this.uploadedFile = event;
      this.isUploaded = true;
      let blob = new Blob([event], { type: event.type });
      let url = window.URL.createObjectURL(blob);
      this.logoCropped = this.sanitizer.bypassSecurityTrustUrl(url);
    }
  }
  ngAfterContentInit(): void {
    this.loaderService.hideLoader();
  }

  reset() {
    this.logoFile = null;
    this.isUploaded = false;
    this.changeLayout.emit(this.isUploaded);
    this.document = new Image();
    this.formData = new FormData();
    this.fileUrl = null;
    this.FileName = '';
    this.FileDescription = '';
    this.uploadedFile = null;
  }
  viewDocument() {
    this.imageURL = this.logoCropped;
    this.isUploaded = true;
    this.changeLayout.emit(this.isUploaded);
  }

  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
    const file = this.dataURLtoFile(event.base64, this.uploadedFile);
    this.formData.delete('file');
    this.formData.append('file', file, this.uploadedFile);
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

  confirm(form: NgForm) {
    this.loaderService.showBtnLoader();
    this.cdf.detectChanges();
    if (this.uploadedFile) {
      this.formData.delete('description');
      this.formData.append('description', this.FileDescription);

      this.fileService.uploadFile(this.formData).subscribe({
        next: (res) => {
          this.reset();
          this.saved = true;
          this.ignoreChanges();
          this.router.navigate(['/']);
        },
        error: (error) => {
          this.ignoreChanges();
          this.saved = false;

          console.error(error);
          alert('An error occurred while uploading the file.');
        },
      });
    }
  }
  saveModal() {
    this.saved = true;
    this.ignoreChanges();
  }
  showErrorSection() {
    const invalidControls = this.findInvalidControls();
    if (invalidControls) {
      this.errorNumber = invalidControls.length;
    }
    return this.errorNumber && this.showMsg;
  }
  public findInvalidControls() {
    const elementWithError =
      this.formElement.nativeElement.querySelectorAll('.ng-invalid');

    return elementWithError;
  }
  unsavedData() {
    this.unsaved = true;
    this.saved = false;
  }
  ignoreChanges() {
    this.emptyDirtyForm(this.myForm);
    this.goToTab.emit(true);
    if (this.closedBtn == true) {
    }
  }
  // empty dirty form
  emptyDirtyForm(form: NgForm) {
    this.unsaved = false;
    Object.keys(form.controls).forEach((control) => {
      form.controls[control].markAsPristine();
      form.controls[control].markAsPristine();
      form.controls[control].setErrors(null);
    });
  }

  checkFrom() {
    return this.myForm.dirty;
  }

  update(event) {
    this.croppedImage = event;
    if (this.logoFile) {
      const file = this.dataURLtoFile(this.croppedImage, this.logoFile.name);
      this.formData.delete('file');
      this.formData.append('file', file, this.logoFile);
    } else {
      const file = this.dataURLtoFile(this.croppedImage, this.uploadedFile);
      this.formData.delete('file');
      this.formData.append('file', file, this.uploadedFile);
    }
  }
}
