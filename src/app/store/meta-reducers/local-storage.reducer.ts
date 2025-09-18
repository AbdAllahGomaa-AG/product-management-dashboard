import { ActionReducer, MetaReducer } from '@ngrx/store';
import { AppState } from '../app.state';

export function localStorageSyncReducer(
  reducer: ActionReducer<AppState>,
): ActionReducer<AppState> {
  return (state, action) => {
    const nextState = reducer(state, action);

    // Sync cart slice
    if (nextState?.cart?.items) {
      localStorage.setItem('cart', JSON.stringify(nextState.cart.items));
    }

    // Sync favorites slice
    if (nextState?.favorites?.items) {
      localStorage.setItem(
        'favorites',
        JSON.stringify(nextState.favorites.items),
      );
    }

    return nextState;
  };
}

export function getInitialCartState() {
  const cart = JSON.parse(localStorage.getItem('cart') || '[]');
  return { items: cart };
}

export function getInitialFavoritesState() {
  const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
  return { items: favorites };
}

export const metaReducers: MetaReducer<AppState>[] = [localStorageSyncReducer];
