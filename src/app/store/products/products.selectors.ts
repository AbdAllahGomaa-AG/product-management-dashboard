import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ProductsState } from 'src/app/core/interface/products.model';

export const selectProductsState =
  createFeatureSelector<ProductsState>('products');

export const selectProductList = createSelector(
  selectProductsState,
  (state) => state.list,
);

export const selectProductsLoading = createSelector(
  selectProductsState,
  (state) => state.loading,
);

export const selectProductsError = createSelector(
  selectProductsState,
  (state) => state.error,
);

export const selectFilteredProducts = createSelector(
  selectProductList,
  selectProductsState,
  (products, state) => {
    let filtered = products;
    if (state.filters.category) {
      filtered = filtered.filter((p) => p.category === state.filters.category);
    }
    if (state.filters.priceRange) {
      const [min, max] = state.filters.priceRange;
      filtered = filtered.filter((p) => p.price >= min && p.price <= max);
    }
    return filtered.sort((a, b) =>
      state.sort === 'asc' ? a.price - b.price : b.price - a.price,
    );
  },
);

export const selectCategories = createSelector(
  selectProductsState,
  (state) => state.categories,
);

export const selectSelectedCategory = createSelector(
  selectProductsState,
  (state: ProductsState) => state.category,
);
