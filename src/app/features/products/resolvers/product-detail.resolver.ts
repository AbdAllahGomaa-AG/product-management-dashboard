import { inject } from '@angular/core';
import { ResolveFn, ActivatedRouteSnapshot } from '@angular/router';
import { Store } from '@ngrx/store';
import { ProductsState, Product } from 'src/app/core/interface/products.model';
import * as ProductDetailActions from 'src/app/store/product-detail/product-detail.actions';
import { selectSelectedProduct } from 'src/app/store/product-detail/product-detail.selectors';
import { filter, first } from 'rxjs/operators';

export const productDetailResolver: ResolveFn<Product | null> = (
  route: ActivatedRouteSnapshot,
) => {
  const store = inject(Store<{ products: ProductsState }>);
  const id = +route.paramMap.get('id')!;

  // Dispatch action to load product
  store.dispatch(ProductDetailActions.loadProductById({ id }));

  // Wait until product is available in the store
  return store.select(selectSelectedProduct).pipe(
    filter((product) => !!product), // continue only when product is loaded
    first(), // take only first value then complete
  );
};
