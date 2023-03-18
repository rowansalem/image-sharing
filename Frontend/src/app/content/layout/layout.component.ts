import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import {
  Component,
  ElementRef,
  HostListener,
  OnChanges,
  OnInit,
  RendererFactory2,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { map, Observable, shareReplay } from 'rxjs';
import { TranslationService } from 'src/app/core/services/translation.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent implements OnInit {
  innerWidth: any;
  isMobile: boolean = false;
  @HostListener('window:resize', ['$event'])
  onResize() {
    this.innerWidth = window.innerWidth;
    if (this.innerWidth > 991) {
      // pc
      this.isMobile = false;
    } else {
      // mobile
      this.isMobile = true;
      this.isOpened();
    }
  }
  lang: string;
  @ViewChild('drawer') formElement: any;
  manueIsOpened: boolean = true;
  isArabic: boolean;
  renderer;
  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );

  constructor(
    private router: Router,
    private breakpointObserver: BreakpointObserver,
    private TranslationService: TranslationService,
    private rootRenderer: RendererFactory2,
    public translate: TranslateService
  ) {
    this.renderer = rootRenderer.createRenderer(
      document.querySelector('html'),
      null
    );
  }
  isOpened() {
    this.manueIsOpened = this.formElement._opened;
  }
  ngOnInit(): void {
    this.lang = this.TranslationService.getSelectedLanguage();
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/auth/login']);
  }
  selectLanguage(selectLanguage: string) {
    this.TranslationService.setLanguage(selectLanguage);
    this.lang = this.TranslationService.getSelectedLanguage();
    this.isArabic = this.TranslationService.isArabic();
    if (this.isArabic) {
      this.renderer.setAttribute(document.querySelector('html'), 'dir', 'rtl');
      this.renderer.setAttribute(document.querySelector('html'), 'lang', 'ar');
    } else {
      this.renderer.setAttribute(document.querySelector('html'), 'dir', 'ltr');
      this.renderer.setAttribute(document.querySelector('html'), 'lang', 'en');
    }
    this.translate.use(selectLanguage);
  }
}
