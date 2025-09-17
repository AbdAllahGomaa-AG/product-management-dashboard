import { createAction, props } from '@ngrx/store';
import { Product } from 'src/app/core/interface/products.model';

// Load product by id
export const loadProductById = createAction(
  '[Product Detail] Load Product By Id',
  props<{ id: number }>(),
);

// Load product by id success
export const loadProductByIdSuccess = createAction(
  '[Product Detail] Load Product By Id Success',
  props<{ product: Product }>(),
);

// Load product by id failure
export const loadProductByIdFailure = createAction(
  '[Product Detail] Load Product By Id Failure',
  props<{ error: string }>(),
);

export const clearSelectedProduct = createAction(
  '[Product Detail] Clear Selected Product',
);
