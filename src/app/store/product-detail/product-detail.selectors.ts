import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ProductDetailState } from './product-detail.reducer';

export const selectProductDetailState =
  createFeatureSelector<ProductDetailState>('productDetail');

export const selectSelectedProduct = createSelector(
  selectProductDetailState,
  (state) => state.selectedProduct,
);

export const selectProductDetailLoading = createSelector(
  selectProductDetailState,
  (state) => state.loading,
);

export const selectProductDetailError = createSelector(
  selectProductDetailState,
  (state) => state.error,
);
