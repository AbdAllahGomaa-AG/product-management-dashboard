import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CartState } from './cart.reducer';

export const selectCartState = createFeatureSelector<CartState>('cart');

// Cart items
export const selectCartItems = createSelector(
  selectCartState,
  (state) => state.items,
);
// Cart total
export const selectCartTotal = createSelector(selectCartItems, (items) =>
  items.reduce((total, item) => total + item.price * item.quantity, 0),
);
// Cart count
export const selectCartCount = createSelector(selectCartItems, (items) =>
  items.reduce((count, item) => count + item.quantity, 0),
);
