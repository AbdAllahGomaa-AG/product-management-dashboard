import { ChangeDetectionStrategy, Component, inject, Input } from '@angular/core';
import { FavoritesState } from 'src/app/store/favorites/favorites.reducer';
import { Store } from '@ngrx/store';
import { Product } from 'src/app/core/interface/products.model';
import { addToFavorites, removeFromFavorites } from 'src/app/store/favorites/favorites.actions';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-add-to-favorites-button',
  templateUrl: './add-to-favorites-button.component.html',
  styleUrls: ['./add-to-favorites-button.component.scss'],

  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddToFavoritesButtonComponent {
  private translate = inject(TranslateService);
  private store = inject(Store<{ favorites: FavoritesState }>);
  @Input() product!: Product;
  @Input() isFavorite!: boolean;

  toggleFavorite() {
    if (this.isFavorite) {
      this.store.dispatch(removeFromFavorites({ productId: this.product.id }));
    } else {
      this.store.dispatch(addToFavorites({ product: this.product }));
    }
    this.isFavorite = !this.isFavorite;
  }
  
 
}
