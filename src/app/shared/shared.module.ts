import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorMessageComponent } from './components/error-message/error-message.component';
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';
import { AddToCartButtonComponent } from './components/add-to-cart-button/add-to-cart-button.component';

@NgModule({
  declarations: [LoadingSpinnerComponent, ErrorMessageComponent, AddToCartButtonComponent],
  imports: [CommonModule],
  exports: [LoadingSpinnerComponent, ErrorMessageComponent, CommonModule, AddToCartButtonComponent],
})
export class SharedModule {}
