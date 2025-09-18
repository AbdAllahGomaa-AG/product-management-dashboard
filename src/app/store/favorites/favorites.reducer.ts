import { createReducer, on } from '@ngrx/store';
import * as FavoritesActions from './favorites.actions';
import { Product } from 'src/app/core/interface/products.model';

export interface FavoritesState {
  items: Product[];
}

// جلب favorites من localStorage
export const getInitialFavoritesState = (): FavoritesState => {
  const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
  return { items: favorites };
};

export const initialState: FavoritesState = getInitialFavoritesState();

export const favoritesReducer = createReducer(
  initialState,
  // Add to favorites

  on(FavoritesActions.addToFavorites, (state, { product }) => {
    const exists = state.items.find((item) => item.id === product.id);
    if (exists) return state;
    return { ...state, items: [...state.items, product] };
  }),
  // Remove from favorites
  on(FavoritesActions.removeFromFavorites, (state, { productId }) => ({
    ...state,
    items: state.items.filter((item) => item.id !== productId),
  })),
  // Load favorites from storage
  on(FavoritesActions.loadFavoritesFromStorage, (state, { favorites }) => ({
    ...state,
    items: favorites,
  })),
  on(FavoritesActions.clearFavorites, (state) => ({ ...state, items: [] })),
);
