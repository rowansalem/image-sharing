import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { TranslationService } from 'src/app/core/services/translation.service';
@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
})
export class PagesComponent implements OnInit {
  isAuth: boolean;
  constructor(
    private router: Router
  ) {
    this.isAuth = true;
  }

  ngOnInit() {
  }
}
