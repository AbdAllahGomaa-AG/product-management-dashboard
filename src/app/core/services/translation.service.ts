import { isPlatformBrowser } from '@angular/common';
import { Injectable, PLATFORM_ID, inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root',
})
export class TranslationService {
  private translateService = inject(TranslateService);
  private platId = inject(PLATFORM_ID);

  constructor() {
    if (isPlatformBrowser(this.platId)) {
      // Set default language
      this.translateService.setDefaultLang('en');

      // Get saved language or fallback to 'en'
      const lang = localStorage.getItem('lang') || 'en';
      this.translateService.use(lang);

      // Set document direction for RTL/LTR
      this.setDirection(lang);
    }
  }

  private setDirection(lang: string): void {
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  }

  changeLang(lang: string): void {
    if (isPlatformBrowser(this.platId)) {
      localStorage.setItem('lang', lang);
    }

    this.translateService.use(lang);
    this.setDirection(lang);
  }
  getCurrentLang(): string {
    return this.translateService.currentLang || 'en';
  }
}
