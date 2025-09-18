import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorMessageComponent } from './components/error-message/error-message.component';
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';
import { AddToCartButtonComponent } from './components/add-to-cart-button/add-to-cart-button.component';
import { AddToFavoritesButtonComponent } from './components/add-to-favorites-button/add-to-favorites-button.component';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [LoadingSpinnerComponent, ErrorMessageComponent, AddToCartButtonComponent, AddToFavoritesButtonComponent],
  imports: [CommonModule, TranslateModule],
  exports: [LoadingSpinnerComponent, ErrorMessageComponent, CommonModule, AddToCartButtonComponent, AddToFavoritesButtonComponent],
})
export class SharedModule {}
