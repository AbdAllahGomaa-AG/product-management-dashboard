import { createAction, props } from '@ngrx/store';
import { Product } from 'src/app/core/interface/products.model';

export const loadProducts = createAction('[Products] Load Products');
// Load Products Success
export const loadProductsSuccess = createAction(
  '[Products] Load Products Success',
  props<{ products: Product[] }>(),
);
// Load Products Failure
export const loadProductsFailure = createAction(
  '[Products] Load Products Failure',
  props<{ error: string }>(),
);
//setFilter
export const setFilter = createAction(
  '[Products] Set Filter',
  props<{ filter: string }>(),
);
//setSort
export const setSort = createAction(
  '[Products] Set Sort',
  props<{ sort: 'asc' | 'desc' }>() ,
);
//setPage
export const setPage = createAction(
  '[Products] Set Page',
  props<{ page: number }>(),
);
//setLimit
export const setLimit = createAction(
  '[Products] Set Limit',
  props<{ limit: number }>(),
);
//setSearch
export const setSearch = createAction(
  '[Products] Set Search',
  props<{ search: string }>(),
);
//setCategory
export const setCategory = createAction(
  '[Products] Set Category',
  props<{ category: string }>(),
);
//setRating
export const setRating = createAction(
  '[Products] Set Rating',
  props<{ rating: number }>(),
);
//loadProductsByCategory
export const loadProductsByCategory = createAction(
  '[Products] Load Products By Category',
  props<{ category: string }>(),
);
//loadProductsByCategorySuccess
export const loadProductsByCategorySuccess = createAction(
  '[Products] Load Products By Category Success',
  props<{ products: Product[] }>(),
);
//loadProductsByCategoryFailure
export const loadProductsByCategoryFailure = createAction(
  '[Products] Load Products By Category Failure',
  props<{ error: string }>(),
);
