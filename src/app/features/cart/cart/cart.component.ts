import { Component, OnInit, ChangeDetectionStrategy, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { CartState } from 'src/app/store/cart/cart.reducer';
import { selectCartItems } from 'src/app/store/cart/cart.selectors';
import { Product } from 'src/app/core/interface/products.model';
import { selectCartTotal } from 'src/app/store/cart/cart.selectors';
import { removeFromCart, updateQuantity } from 'src/app/store/cart/cart.actions';
import { addToFavorites } from 'src/app/store/favorites/favorites.actions';
import { selectCartCount } from 'src/app/store/cart/cart.selectors';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CartComponent implements OnInit {
  cartItemsCount!: Observable<number>;
  cartItemsCountValue!: number;
  cartItems$!: Observable<Product[]>;
  cartTotal$!: Observable<number>;
  private store = inject(Store<{ cart: CartState }>);

  ngOnInit(): void {
    this.cartItems$ = this.store.select(selectCartItems);
    this.cartTotal$ = this.store.select(selectCartTotal);
    this.cartItemsCount = this.store.select(selectCartCount);
    this.cartItemsCount.subscribe((count) => {
      this.cartItemsCountValue = count;
    });


  }
  trackByItem(index: number, item: Product): number {
    return item.id;
  }
  removeFromCart(product: Product) {
    this.store.dispatch(removeFromCart({ productId: product.id }));
  }
  addToFavorites(product: Product) {
    this.store.dispatch(addToFavorites({ product }));
  }
  incrementQuantity(product: Product) {
    this.store.dispatch(updateQuantity({ productId: product.id, quantity: product.quantity + 1 }));
  }
  decrementQuantity(product: Product) {
    this.store.dispatch(updateQuantity({ productId: product.id, quantity: product.quantity - 1 }));
  }
}
