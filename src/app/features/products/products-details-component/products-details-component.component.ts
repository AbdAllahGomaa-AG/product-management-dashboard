import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { ProductsState } from 'src/app/core/interface/products.model';
import { Observable } from 'rxjs';
import { Product } from 'src/app/core/interface/products.model';
import * as ProductDetailActions from 'src/app/store/product-detail/product-detail.actions';
import { selectSelectedProduct } from 'src/app/store/product-detail/product-detail.selectors';

@Component({
  selector: 'app-products-details-component',
  templateUrl: './products-details-component.component.html',
  styleUrls: ['./products-details-component.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductsDetailsComponentComponent implements OnInit {
  //#region  inject
  private readonly activatedRoute = inject(ActivatedRoute);
  private store = inject(Store<{ products: ProductsState }>);

  //#endregion

  //#region  variables
  productId!: number;
  product$!: Observable<Product | null>;
  //#endregion

  //#region  ngOnInit
  ngOnInit(): void {
    this.GetProductById();
    this.store.dispatch(
      ProductDetailActions.loadProductById({ id: this.productId }),
    );
    this.product$ = this.store.select(selectSelectedProduct);
    this.product$.subscribe((product) => {
      console.log(product);
    });
  }

  GetProductById(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.productId = params['id'];
    });
  }
  //#endregion
}
