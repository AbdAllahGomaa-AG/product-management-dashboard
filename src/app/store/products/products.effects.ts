import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import * as ProductsActions from './products.actions';
import { ProductService } from 'src/app/core/services/product.service';

@Injectable()
export class ProductsEffects {
  constructor(
    private actions$: Actions,
    private productsService: ProductService,
  ) {}

  loadProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductsActions.loadProducts),
      mergeMap(() =>
        this.productsService.getProducts().pipe(
          map((products) => ProductsActions.loadProductsSuccess({ products })),
          catchError((error) =>
            of(ProductsActions.loadProductsFailure({ error: error.message })),
          ),
        ),
      ),
    ),
  );

  loadProductsByCategory$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductsActions.loadProductsByCategory),
      mergeMap(({ category }) =>
        this.productsService.getProductsByCategory(category).pipe(
          map((products) =>
            ProductsActions.loadProductsByCategorySuccess({ products }),
          ),
          catchError((error) =>
            of(
              ProductsActions.loadProductsByCategoryFailure({
                error: error.message,
              }),
            ),
          ),
        ),
      ),
    ),
  );
}
