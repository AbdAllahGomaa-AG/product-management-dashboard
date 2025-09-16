import { createReducer, on } from '@ngrx/store';

import * as ProductsActions from './products.actions';
import { initialProductsState } from 'src/app/core/interface/products.model';

export const productsReducer = createReducer(
  initialProductsState,
  on(ProductsActions.loadProducts, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(ProductsActions.loadProductsSuccess, (state, { products }) => ({
    ...state,
    list: products,
    loading: false,
  })),

  on(ProductsActions.loadProductsFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),
  on(ProductsActions.loadProductsByCategory, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(ProductsActions.loadProductsByCategorySuccess, (state, { products }) => ({
    ...state,
    list: products,
    loading: false,
  })),
  on(ProductsActions.loadProductsByCategoryFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),
  on(ProductsActions.setFilter, (state, { filter }) => ({
    ...state,
    filters: { ...state.filters, category: filter }, // أو حسب اللي انت عايزه
  })),
  on(ProductsActions.setSort, (state, { sort }) => ({ ...state, sort })),
  on(ProductsActions.setPage, (state, { page }) => ({
    ...state,
    pagination: { ...state.pagination, page },
  })),
);
