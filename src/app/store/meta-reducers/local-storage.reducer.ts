import { ActionReducer, MetaReducer } from '@ngrx/store';
import { AppState } from '../app.state';

export function localStorageSyncReducer(
  reducer: ActionReducer<AppState>,
): ActionReducer<AppState> {
  return (state, action) => {
    const nextState = reducer(state, action);

    // Sync cart slice only
    if (nextState && nextState.cart && nextState.cart.items) {
      localStorage.setItem('cart', JSON.stringify(nextState.cart.items));
    }

    return nextState;
  };
}

export function getInitialCartState() {
  const cart = JSON.parse(localStorage.getItem('cart') || '[]');
  return { items: cart };
}

export const metaReducers: MetaReducer<AppState>[] = [localStorageSyncReducer];
