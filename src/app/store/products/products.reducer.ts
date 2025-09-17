import { createReducer, on } from '@ngrx/store';
import * as ProductsActions from './products.actions';
import { initialProductsState } from 'src/app/core/interface/products.model';

export const productsReducer = createReducer(
  initialProductsState,

  // Load products list
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

  // Categories
  on(ProductsActions.getCategories, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  on(ProductsActions.getCategoriesSuccess, (state, { categories }) => ({
    ...state,
    loading: false,
    categories,
  })),

  on(ProductsActions.getCategoriesFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // Products by category
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

  // Filters & pagination
  on(ProductsActions.setCategory, (state, { category }) => ({
    ...state,
    selectedCategory: category,
  })),

  on(ProductsActions.setFilter, (state, { filter }) => ({
    ...state,
    filters: { ...state.filters, category: filter },
  })),

  on(ProductsActions.setSort, (state, { sort }) => ({ ...state, sort })),

  on(ProductsActions.setPage, (state, { page }) => ({
    ...state,
    pagination: { ...state.pagination, page },
  })),

  on(ProductsActions.setLimit, (state, { limit }) => ({
    ...state,
    pagination: { ...state.pagination, limit },
  })),

  on(ProductsActions.setSearch, (state, { search }) => ({
    ...state,
    filters: { ...state.filters, search },
  })),

  on(ProductsActions.setRating, (state, { rating }) => ({
    ...state,
    filters: { ...state.filters, rating },
  })),
);
