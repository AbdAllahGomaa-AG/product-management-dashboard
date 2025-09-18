import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as CartActions from './cart.actions';
import { tap } from 'rxjs/operators';
import Swal from 'sweetalert2';

@Injectable()
export class CartEffects {
  private actions$ = inject(Actions);

  addToCart$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(CartActions.addToCart),
        tap(({ product }) => {
          Swal.fire({
            toast: true,  
            position: 'top-end',  
            icon: 'success',
            title: `${product.title} added to cart`,
            showConfirmButton: false,
            timer: 2000,
            timerProgressBar: true,
          });
        }),
      ),
    { dispatch: false },
  );

  removeFromCart$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(CartActions.removeFromCart),
        tap(() => {
          Swal.fire({
            toast: true,
            position: 'top-end',
            icon: 'error',
            title: `Product removed from cart`,
            showConfirmButton: false,
            timer: 2000,
            timerProgressBar: true,
          });
        }),
      ),
    { dispatch: false },
  );
}
