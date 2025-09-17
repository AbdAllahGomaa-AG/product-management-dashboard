import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import * as ProductDetailActions from './product-detail.actions';
import { ProductService } from 'src/app/core/services/product.service';

@Injectable()
export class ProductDetailEffects {
  private actions$ = inject(Actions);
  private productService = inject(ProductService);

  // loadProductById
  loadProductById$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductDetailActions.loadProductById),
      tap((action) =>
        console.log('[ProductDetailEffects] loadProductById id=', action.id),
      ),
      mergeMap(({ id }) =>
        this.productService.getProductById(id).pipe(
          tap((product) =>
            console.log('[ProductDetailEffects] API returned', product),
          ),
          map((product) =>
            ProductDetailActions.loadProductByIdSuccess({ product }),
          ),
          catchError((error) =>
            of(
              ProductDetailActions.loadProductByIdFailure({
                error: error?.message || 'Unknown error',
              }),
            ),
          ),
        ),
      ),
    ),
  );
}
