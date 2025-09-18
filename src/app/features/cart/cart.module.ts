import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { SharedModule } from 'src/app/shared/shared.module';
import { CartComponent } from './cart/cart.component';
import { Routes } from '@angular/router';
const routes: Routes = [
  { path: '', component: CartComponent },
];

@NgModule({
  declarations: [CartComponent],
  imports: [
    CommonModule,
    RouterModule,
    TranslateModule,
    SharedModule, 
    RouterModule.forChild(routes),
  ],
  exports: [CartComponent],
})
export class CartModule {}
