import { Image } from '../../../../core/models/images/image';
import { Component, OnInit, Output, EventEmitter, Input, HostListener } from '@angular/core';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-documents-dropzone',
  templateUrl: './documents-dropzone.component.html',
})
export class DocumentsDropzoneComponent implements OnInit {
    // MOBILE
    innerWidth: number;
    isMobile :boolean;
    @Output() isThereOneFile = new EventEmitter<boolean>();
    @HostListener('window:resize', ['$event'])
    onResize() {
      this.innerWidth = window.innerWidth;
      if (this.innerWidth > 991) {
        // pc
        this.isMobile = false;

      } else {
        // mobile
        this.isMobile = true;
      }
    }
    // MOBILE
  _disableSuggetions: boolean;
  suggestedName: string;
  fileExt: string;
  isLargeFile: boolean = false;
  maxFileSize: number;
  @Output() closeDropzone = new EventEmitter();

  @Input() isAside: boolean = false;
  @Input() hideTitle: boolean = false;
  @Input() infoHelp: boolean = true;
  @Input() required: boolean;
  @Input() multiple : boolean = false;
  @Input() accept : string = '*';

  @Input() image: Image;
  @Input() formData: FormData;
  @Input() objectName: string;
  @Input() showMsg: boolean;
  isVertical: boolean = false;
  @Input() documents: Array<any> = [];
  count: number;


  select = true;
  documentName;
  progress = 0;
  files: File[] = [];
  constructor() {
  }
  ngOnInit() {
    this.maxFileSize = environment.maxFileSize;
    this.onResize();
  }

  onSelect(event) {
    if(this.files.length == 0){
    this.files.push(...event.addedFiles);
    if (event.rejectedFiles.length === 0) {
      this.isLargeFile = false;
      this.formData.delete('file');
      this.formData.append('file', this.files[0], this.files[0].name);
      const fileTokens = this.files[0].name.split('.');
      this.fileExt = fileTokens[fileTokens.length - 1];
      setTimeout(() => {
        for (let i = 1; i <= 100; i++) {
          this.progress = i;
        }
        this.closeDropzone.emit(this.files[0]);
      }, 1000);
      this.isThereOneFile.emit(true)
    } else {
      this.isLargeFile = true;
    }
  }

  }
  onRemove(event) {
    this.files.splice(this.files.indexOf(event), 1);
    this.formData.delete('file');
    this.progress = 50;
  }

  getsCount(suggestedName: string) {
    if (this.documents) {
      return this.documents.filter(a => a.name.startsWith(suggestedName)).length;
    }
    else {
      return null;
    }
  }
}

