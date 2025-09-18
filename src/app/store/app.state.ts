// src/app/store/app.state.ts
import { ProductDetailState } from './product-detail/product-detail.reducer';
import { CartState } from './cart/cart.reducer';
import { ProductsState } from '../core/interface/products.model';
import { FavoritesState } from './favorites/favorites.reducer';

export interface AppState {
  products: ProductsState;
  productDetail: ProductDetailState;
  cart: CartState;
  favorites: FavoritesState;
}
