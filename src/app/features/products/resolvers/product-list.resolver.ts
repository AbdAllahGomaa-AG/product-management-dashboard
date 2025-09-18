import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { Store } from '@ngrx/store';
import { ProductsState, Product } from 'src/app/core/interface/products.model';
import { loadProducts } from 'src/app/store/products/products.actions';
import { selectProductList } from 'src/app/store/products/products.selectors';
import { filter, first, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { ProductCacheService } from 'src/app/core/services/ProductCache.Service';

export const productListResolver: ResolveFn<Product[]> = () => {
  const store = inject(Store<{ products: ProductsState }>);
  const cache = inject(ProductCacheService);

  const cachedList = cache.getList();
  if (cachedList) return of(cachedList); 

  store.dispatch(loadProducts());

  return store.select(selectProductList).pipe(
    filter((products) => products.length > 0),
    first(),
    tap((products) => cache.setList(products)), 
  );
};
