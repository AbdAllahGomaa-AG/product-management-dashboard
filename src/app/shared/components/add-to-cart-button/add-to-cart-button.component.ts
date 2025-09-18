import { ChangeDetectionStrategy, Component, Input, inject } from '@angular/core';
import { Product } from 'src/app/core/interface/products.model';
import { Store } from '@ngrx/store';
import { CartState } from 'src/app/store/cart/cart.reducer';
import { addToCart } from 'src/app/store/cart/cart.actions';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-add-to-cart-button',
  templateUrl: './add-to-cart-button.component.html',
  styleUrls: ['./add-to-cart-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddToCartButtonComponent {
  private store = inject(Store<{ cart: CartState }>);
  private translate = inject(TranslateService); 

  @Input() product!: Product;

  addToCartHandler() {
    const cartItem = {
      ...this.product,
      quantity: 1,
    };
    this.store.dispatch(addToCart({ product: cartItem }));

    console.log(cartItem);
  }
}
