import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Observable, of } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface Locale {
  lang: string;
  data: Object;
}

@Injectable({
  providedIn: 'root',
})
export class TranslationService {
  private langIds: any = [];
  private selectedLanguage!: string;

  constructor(private translate: TranslateService) {
    // get web client default language
    const defaultLang =
      environment.defaultsLanguage === undefined
        ? 'ar'
        : environment.defaultsLanguage;

    // add new langIds to the list
    this.translate.addLangs([defaultLang]);

    // this language will be used as a fallback when a translation isn't found in the current language
    if (localStorage.getItem('admin-language')) {
      this.translate.setDefaultLang(localStorage.getItem('admin-language'));
    } else {
      this.translate.setDefaultLang(defaultLang);
    }
  }

  public loadTranslations(...args: Locale[]): void {
    const locales = [...args];

    locales.forEach((locale) => {
      // use setTranslation() with the third argument set to true
      // to append translations instead of replacing them
      this.translate.setTranslation(locale.lang, locale.data, true);

      this.langIds.push(locale.lang);
    });

    // add new languages to the list
    this.translate.addLangs(this.langIds);
  }

  public setLanguage(lang: string) {
    if (lang) {
      localStorage.setItem('admin-language', lang);
    }
  }

  public getSelectedLanguage(): string {
    return (
      localStorage.getItem('admin-language') || this.translate.getDefaultLang()
    );
  }

  public isArabic(): boolean {
    this.selectedLanguage = this.getSelectedLanguage();
    if (this.selectedLanguage === 'ar') {
      return true;
    } else {
      return false;
    }
  }
}
