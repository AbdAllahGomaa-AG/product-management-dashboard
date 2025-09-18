import { Component, inject, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { FavoritesState } from 'src/app/store/favorites/favorites.reducer';
import { Observable } from 'rxjs';
import { Product } from 'src/app/core/interface/products.model';
import {
  selectFavoriteItems,
  selectFavoritesCount,
} from 'src/app/store/favorites/favorites.selectors';
import { clearFavorites } from 'src/app/store/favorites/favorites.actions';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FavoritesComponent implements OnInit {
  private store = inject(Store<{ favorites: FavoritesState }>);
  private translate = inject(TranslateService);
  FavItems$!: Observable<Product[]>;
  FavCount$!: Observable<number>;

  ngOnInit(): void {
    this.FavItems$ = this.store.select(selectFavoriteItems);
    this.FavCount$ = this.store.select(selectFavoritesCount);
  }
  clearAllFavorites() {
    this.store.dispatch(clearFavorites());
  }
  trackBy(index: number, item: Product): number {
    return item.id;   
}
}
