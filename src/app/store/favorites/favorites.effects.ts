import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as FavoritesActions from './favorites.actions';
import { tap } from 'rxjs/operators';
import Swal from 'sweetalert2';

@Injectable()
export class FavoritesEffects {
  private actions$ = inject(Actions);

  addToFavorites$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(FavoritesActions.addToFavorites),
        tap(({ product }) => {
          Swal.fire({
            toast: true,
            position: 'top-end',
            icon: 'success',
            title: `${product.title} added to favorites`,
            showConfirmButton: false,
            timer: 2000,
            timerProgressBar: true,
          });
        }),
      ),
    { dispatch: false },
  );

  removeFromFavorites$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(FavoritesActions.removeFromFavorites),
        tap(() => {
          Swal.fire({
            toast: true,
            position: 'top-end',
            icon: 'error',
            title: `Product removed from favorites`,
            showConfirmButton: false,
            timer: 2000,
            timerProgressBar: true,
          });
        }),
      ),
    { dispatch: false },
  );
}
