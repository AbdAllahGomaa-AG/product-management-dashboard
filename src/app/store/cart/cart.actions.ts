import { createAction, props } from '@ngrx/store';
import { CartItem } from 'src/app/core/interface/products.model';
// Actions
// Add to cart
export const addToCart = createAction(
  '[Cart] Add To Cart',
  props<{ product: CartItem }>(),
);

// Remove from cart
export const removeFromCart = createAction(
  '[Cart] Remove From Cart',
  props<{ productId: number }>(),
);
// Update quantity
export const updateQuantity = createAction(
  '[Cart] Update Quantity',
  props<{ productId: number; quantity: number }>(),
);
// Clear cart
export const clearCart = createAction('[Cart] Clear Cart');
// Load cart from storage
export const loadCartFromStorage = createAction(
  '[Cart] Load From Storage',
  props<{ cart: CartItem[] }>(),
);
