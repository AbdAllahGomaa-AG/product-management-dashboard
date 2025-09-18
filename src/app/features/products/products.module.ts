import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { ProductListComponent } from './product-list/product-list.component';
import { ProductsDetailsComponentComponent } from './products-details-component/products-details-component.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { Routes } from '@angular/router';
import { productDetailResolver } from './resolvers/product-detail.resolver';
import { productListResolver } from './resolvers/product-list.resolver';
import { CdkFixedSizeVirtualScroll } from "@angular/cdk/scrolling";
const routes: Routes = [
  {
    path: '',
    component: ProductListComponent,
    resolve: { products: productListResolver },
  },
  {
    path: 'productsDetails/:id',
    component: ProductsDetailsComponentComponent,
    resolve: { product: productDetailResolver },
  },
];

@NgModule({
  declarations: [ProductListComponent, ProductsDetailsComponentComponent],
  imports: [
    CommonModule,
    RouterModule,
    TranslateModule,
    SharedModule,
    RouterModule.forChild(routes),
    CdkFixedSizeVirtualScroll
],
  exports: [ProductListComponent, ProductsDetailsComponentComponent],
})
export class ProductsModule {}
