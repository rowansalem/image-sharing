import { Component, OnInit } from '@angular/core';
import { Image } from 'src/app/core/models/images/image';
import { LoaderService } from '../../../../core/services/shared/loader.service';
import { FileService } from '../../../../core/services/file.service';

@Component({
  selector: 'app-image-list',
  templateUrl: './image-list.component.html',
})
export class ImageListComponent implements OnInit {
  cards: Image[] = [];
  page = 0;
  limit = 10;
  loading = false;
  hasMore = true;

  constructor(private LoaderService: LoaderService,private fileService: FileService) {}

  ngOnInit(): void {
    this.loadFiles();
  }
  loadFiles() {
    if (this.hasMore && !this.loading) {
      this.loading = true;
      this.fileService.getPaginatedFiles(this.page, this.limit).subscribe({
        next: (res) => {
          const list :Image[] = res.data;
          if (list.length < this.limit) {
            this.hasMore = false;
          } else {
            this.page++;
          }
          this.cards = this.cards.concat(list);
          this.loading = false;
        },
        error: (error) => {
          console.error(error);
          this.loading = false;
        }
      });
    }
  }

  onScroll() {
    this.loadFiles();
  }
  ngAfterContentInit(): void {
    this.LoaderService.hideLoader();
  }
}
