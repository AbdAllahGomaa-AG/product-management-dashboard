import { createAction, props } from '@ngrx/store';
import { Product } from 'src/app/core/interface/products.model';

//#region Load Products (list)
export const loadProducts = createAction('[Products] Load Products');

export const loadProductsSuccess = createAction(
  '[Products] Load Products Success',
  props<{ products: Product[] }>(),
);

export const loadProductsFailure = createAction(
  '[Products] Load Products Failure',
  props<{ error: string }>(),
);
//#endregion

//#region Filters & Sorting & Pagination
export const setFilter = createAction(
  '[Products] Set Filter',
  props<{ filter: string }>(),
);

export const setSort = createAction(
  '[Products] Set Sort',
  props<{ sort: 'asc' | 'desc' }>(),
);

export const setPage = createAction(
  '[Products] Set Page',
  props<{ page: number }>(),
);

export const setLimit = createAction(
  '[Products] Set Limit',
  props<{ limit: number }>(),
);

export const setSearch = createAction(
  '[Products] Set Search',
  props<{ search: string }>(),
);

export const setCategory = createAction(
  '[Products] Set Category',
  props<{ category: string }>(),
);

export const setRating = createAction(
  '[Products] Set Rating',
  props<{ rating: number }>(),
);
//#endregion

//#region Categories
export const getCategories = createAction('[Products] Get Categories');

export const getCategoriesSuccess = createAction(
  '[Products] Get Categories Success',
  props<{ categories: string[] }>(),
);

export const getCategoriesFailure = createAction(
  '[Products] Get Categories Failure',
  props<{ error: string }>(),
);
//#endregion

//#region Products By Category
export const loadProductsByCategory = createAction(
  '[Products] Load Products By Category',
  props<{ category: string }>(),
);

export const loadProductsByCategorySuccess = createAction(
  '[Products] Load Products By Category Success',
  props<{ products: Product[] }>(),
);

export const loadProductsByCategoryFailure = createAction(
  '[Products] Load Products By Category Failure',
  props<{ error: string }>(),
);
//#endregion
