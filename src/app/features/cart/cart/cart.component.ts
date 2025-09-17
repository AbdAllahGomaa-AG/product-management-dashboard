import { Component, OnInit, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { CartState } from 'src/app/store/cart/cart.reducer';
import { selectCartItems } from 'src/app/store/cart/cart.selectors';
import { Product } from 'src/app/core/interface/products.model';
import { selectCartTotal } from 'src/app/store/cart/cart.selectors';
import { removeFromCart } from 'src/app/store/cart/cart.actions';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  cartItemsCount = 0;
  cartItems$!: Observable<Product[]>;
  cartTotal$!: Observable<number>;
  private store = inject(Store<{ cart: CartState }>);

  ngOnInit(): void {
    this.cartItems$ = this.store.select(selectCartItems);
    this.cartTotal$ = this.store.select(selectCartTotal);

  }
  trackByItem(index: number, item: Product): number {
    return item.id;
  }
  removeFromCart(product: Product) {
    this.store.dispatch(removeFromCart({ productId: product.id }));
  }
}
