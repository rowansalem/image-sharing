import { Component, OnInit } from '@angular/core';
import { LoaderService } from 'src/app/core/services/shared/loader.service';

@Component({
  selector: 'app-error-page',
  templateUrl: './error-page.component.html',
})
export class ErrorPageComponent implements OnInit {
  constructor(private LoaderService: LoaderService) {}

  ngOnInit(): void {}

  ngAfterContentInit(): void {
    this.LoaderService.hideLoader();
  }
}
