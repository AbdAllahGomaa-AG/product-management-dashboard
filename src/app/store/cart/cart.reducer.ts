import { createReducer, on } from '@ngrx/store';
import * as CartActions from './cart.actions';
import { CartItem } from 'src/app/core/interface/products.model';

export interface CartState {
  items: CartItem[];
}

export const initialState: CartState = {
  items: [],
};

export const  cartReducer = createReducer(
  initialState,

  // Add to cart
  on(CartActions.addToCart, (state, { product }) => {
    const existing = state.items.find((item) => item.id === product.id);
    if (existing) {
      return {
        ...state,
        items: state.items.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        ),
      };
    }
    return {
      ...state,
      items: [...state.items, { ...product, quantity: 1 }],
    };
  }),

  // Remove from cart
  on(CartActions.removeFromCart, (state, { productId }) => ({
    ...state,
    items: state.items.filter((item) => item.id !== productId),
  })),

  // Update quantity
  on(CartActions.updateQuantity, (state, { productId, quantity }) => ({
    ...state,
    items: state.items.map((item) =>
      item.id === productId ? { ...item, quantity } : item,
    ),
  })),

  // Clear cart
  on(CartActions.clearCart, (state) => ({ ...state, items: [] })),

  // Load cart from storage
  on(CartActions.loadCartFromStorage, (state, { cart }) => ({
    ...state,
    items: cart,
  })),
);
