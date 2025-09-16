import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { loadProducts } from 'src/app/store/products/products.actions';
import {
  selectProductList,
  selectProductsLoading,
  selectProductsError,
} from 'src/app/store/products/products.selectors';
import { ProductsState } from 'src/app/core/interface/products.model';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent {
  products$ = this.store.select(selectProductList);
  loading$ = this.store.select(selectProductsLoading);
  error$ = this.store.select(selectProductsError);
  constructor(private store: Store<{ products: ProductsState }>) {}
  ngOnInit(): void {
    this.store.dispatch(loadProducts());
    this.products$.subscribe((products) => console.log(products));
    this.loading$.subscribe((loading) => console.log(loading));
    this.error$.subscribe((error) => console.log(error));
  }

  getStars(rate: number): number[] {
    return Array(Math.round(rate)).fill(0);
  }
}
