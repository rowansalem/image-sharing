import { Component, OnInit } from '@angular/core';
import { LoaderService } from 'src/app/core/services/shared/loader.service';

@Component({
  selector: 'app-loader-with-bg',
  templateUrl: './loader-with-bg.component.html'
})
export class LoaderWithBgComponent implements OnInit {
  loader: boolean

  constructor(private loaderService: LoaderService) {
    this.loaderService.loading.subscribe((loader) => {
      this.loader = loader
    });
  }

  ngOnInit(): void {
  }

}
