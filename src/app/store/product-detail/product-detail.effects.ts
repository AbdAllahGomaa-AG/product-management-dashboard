import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of, Observable, timer } from 'rxjs';
import {
  catchError,
  map,
  mergeMap,
  tap,
  retryWhen,
  scan,
} from 'rxjs/operators';
import * as ProductDetailActions from './product-detail.actions';
import { ProductService } from 'src/app/core/services/product.service';
import { Product } from 'src/app/core/interface/products.model';

@Injectable()
export class ProductDetailEffects {
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

  loadProductById$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductDetailActions.loadProductById),
      tap((action) =>
        console.log('[ProductDetailEffects] loadProductById id=', action.id),
      ),
      mergeMap(({ id }) =>
        this.productService.getProductById(id).pipe(
          this.retryStrategy(),
          tap((product) =>
            console.log('[ProductDetailEffects] API returned', product),
          ),
          map((product: Product) =>
            ProductDetailActions.loadProductByIdSuccess({ product }),
          ),
          catchError((error: unknown) =>
            of(
              ProductDetailActions.loadProductByIdFailure({
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
