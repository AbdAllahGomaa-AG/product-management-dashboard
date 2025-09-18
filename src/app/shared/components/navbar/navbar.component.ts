import { ChangeDetectionStrategy, Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Store } from '@ngrx/store';
import { inject } from '@angular/core';
import { FavoritesState } from 'src/app/store/favorites/favorites.reducer';
import { selectFavoritesCount } from 'src/app/store/favorites/favorites.selectors';
import { selectCartCount } from 'src/app/store/cart/cart.selectors';
import { Observable } from 'rxjs';
import { TranslationService } from 'src/app/core/services/translation.service';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive, TranslateModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarComponent implements OnInit {
  constructor() {
    this.currentLang = this.translationService.getCurrentLang();
  }
  private store = inject(Store<{ favorites: FavoritesState }>);
  private translationService = inject(TranslationService);
  private cdr = inject(ChangeDetectorRef);
  FavCount$!: Observable<number>;
  FavCount!: number;
  CartCount$!: Observable<number>;
  CartCount!: number;
  currentLang: string;

  ngOnInit(): void {
    this.FavCount$ = this.store.select(selectFavoritesCount);
    this.FavCount$.subscribe((count) => (this.FavCount = count));
    this.CartCount$ = this.store.select(selectCartCount);
    this.CartCount$.subscribe((count) => (this.CartCount = count));
  }

  toggleLang() {
    this.currentLang = this.currentLang === 'en' ? 'ar' : 'en';
    this.translationService.changeLang(this.currentLang);
    this.cdr.detectChanges();
  }
}
