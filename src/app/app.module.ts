import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { productsReducer } from './store/products/products.reducer';
import { ProductListComponent } from './features/products/product-list/product-list.component';
import { EffectsModule } from '@ngrx/effects';
import { ProductsEffects } from './store/products/products.effects';
import { HttpClientModule } from '@angular/common/http';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterModule } from '@angular/router';
import { ProductsDetailsComponentComponent } from './features/products/products-details-component/products-details-component.component';
import { ProductDetailEffects } from './store/product-detail/product-detail.effects';
import { productDetailReducer } from './store/product-detail/product-detail.reducer';
import { CartComponent } from './features/cart/cart/cart.component';
import { FavoritesComponent } from './features/favorites/favorites/favorites.component';


@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    ProductsDetailsComponentComponent,
    CartComponent,
    FavoritesComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot({ products: productsReducer, productDetail: productDetailReducer }),
    EffectsModule.forRoot([ProductsEffects, ProductDetailEffects]),
    HttpClientModule,
    NavbarComponent,
    SharedModule,
    RouterModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
