import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of, Observable, timer } from 'rxjs';
import { catchError, map, mergeMap, retryWhen, scan } from 'rxjs/operators';
import * as ProductsActions from './products.actions';
import { ProductService } from 'src/app/core/services/product.service';
import { Product } from 'src/app/core/interface/products.model';

@Injectable()
export class ProductsEffects {
  private actions$ = inject(Actions);
  private productService = inject(ProductService);

  private retryStrategy =
    <T>(maxRetry = 3, delayMs = 1000) =>
    (source: Observable<T>) =>
      source.pipe(
        retryWhen((errors) =>
          errors.pipe(
            scan((retryCount, error) => {
              if (retryCount >= maxRetry) throw error;
              return retryCount + 1;
            }, 0),
            mergeMap((retryCount) => timer(retryCount * delayMs)),
          ),
        ),
      );

  loadProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductsActions.loadProducts),
      mergeMap(() =>
        this.productService.getProducts().pipe(
          this.retryStrategy(),
          map((products: Product[]) =>
            ProductsActions.loadProductsSuccess({ products }),
          ),
          catchError((error: unknown) =>
            of(
              ProductsActions.loadProductsFailure({
                error:
                  error instanceof Error
                    ? error.message
                    : typeof error === 'string'
                      ? error
                      : 'Unknown error',
              }),
            ),
          ),
        ),
      ),
    ),
  );

  loadProductsByCategory$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductsActions.loadProductsByCategory),
      mergeMap(({ category }) =>
        this.productService.getProductsByCategory(category).pipe(
          this.retryStrategy(),
          map((products: Product[]) =>
            ProductsActions.loadProductsByCategorySuccess({ products }),
          ),
          catchError((error: unknown) =>
            of(
              ProductsActions.loadProductsByCategoryFailure({
                error:
                  error instanceof Error
                    ? error.message
                    : typeof error === 'string'
                      ? error
                      : 'Unknown error',
              }),
            ),
          ),
        ),
      ),
    ),
  );

  getCategories$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductsActions.getCategories),
      mergeMap(() =>
        this.productService.getCategories().pipe(
          this.retryStrategy(),
          map((categories: string[]) =>
            ProductsActions.getCategoriesSuccess({ categories }),
          ),
          catchError((error: unknown) =>
            of(
              ProductsActions.getCategoriesFailure({
                error:
                  error instanceof Error
                    ? error.message
                    : typeof error === 'string'
                      ? error
                      : 'Unknown error',
              }),
            ),
          ),
        ),
      ),
    ),
  );
}
