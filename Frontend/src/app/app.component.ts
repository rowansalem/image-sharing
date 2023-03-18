import { Component, OnInit, RendererFactory2 } from '@angular/core';
import { TranslationService } from './core/services/translation.service';

// language list
import { LoaderService } from './core/services/shared/loader.service';
import { Router, NavigationEnd } from '@angular/router';
import { arLang } from './config/i18n/ar';
import { enLang } from './config/i18n/en';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  isArabic: boolean;
  renderer;
  loader: boolean;
  lang: string;

  constructor(
    private translationService: TranslationService,
    private loaderService: LoaderService,
    private router: Router,
    rootRenderer: RendererFactory2
  ) {
    this.loaderService.showLoader();
    this.loader = this.loaderService.loaderModel.enable;
    this.renderer = rootRenderer.createRenderer(
      document.querySelector('html'),
      null
    );
    this.translationService.loadTranslations(enLang, arLang);
  }
  ngOnInit(): void {
    this.lang = this.translationService.getSelectedLanguage();
    if (!this.lang) {
      this.translationService.setLanguage(environment.defaultsLanguage);
    }
    this.isArabic = this.translationService.isArabic();
    if (this.isArabic) {
      this.renderer.setAttribute(document.querySelector('html'), 'dir', 'rtl');
      this.renderer.setAttribute(document.querySelector('html'), 'lang', 'ar');
    }
  }
}
