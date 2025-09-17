import { createReducer, on } from '@ngrx/store';
import * as ProductDetailActions from './product-detail.actions';
import { Product } from 'src/app/core/interface/products.model';

export interface ProductDetailState {
  selectedProduct: Product | null;
  loading: boolean;
  error: string | null;
}

export const initialProductDetailState: ProductDetailState = {
  selectedProduct: null,
  loading: false,
  error: null,
};

export const productDetailReducer = createReducer(
  initialProductDetailState,

  // Load product by ID
  on(ProductDetailActions.loadProductById, (state) => ({
    ...state,
    loading: true,
    error: null,
    selectedProduct: null,
  })),

  on(ProductDetailActions.loadProductByIdSuccess, (state, { product }) => ({
    ...state,
    loading: false,
    selectedProduct: product,
    error: null,
  })),

  on(ProductDetailActions.loadProductByIdFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
    selectedProduct: null,
  })),

  // Clear selected product
  on(ProductDetailActions.clearSelectedProduct, (state) => ({
    ...state,
    selectedProduct: null,
    error: null,
    loading: false,
  })),
);
