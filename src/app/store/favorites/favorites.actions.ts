import { createAction, props } from '@ngrx/store';
import { Product } from 'src/app/core/interface/products.model';

// Add to favorites
export const addToFavorites = createAction(
  '[Favorites] Add To Favorites',
  props<{ product: Product }>(),
);

// Remove from favorites
export const removeFromFavorites = createAction(
  '[Favorites] Remove From Favorites',
  props<{ productId: number }>(),
);

// Load favorites from storage
export const loadFavoritesFromStorage = createAction(
  '[Favorites] Load From Storage',
  props<{ favorites: Product[] }>(),
);

// Clear favorites
export const clearFavorites = createAction('[Favorites] Clear Favorites');
