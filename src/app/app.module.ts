import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import {
  HTTP_INTERCEPTORS,
  HttpClient,
  HttpClientModule,
} from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { productsReducer } from './store/products/products.reducer';
import { productDetailReducer } from './store/product-detail/product-detail.reducer';
import { cartReducer } from './store/cart/cart.reducer';
import { ProductsEffects } from './store/products/products.effects';
import { ProductDetailEffects } from './store/product-detail/product-detail.effects';

import {
  metaReducers,
  getInitialCartState,
} from './store/meta-reducers/local-storage.reducer';
import { AppState } from './store/app.state';

import { ProductListComponent } from './features/products/product-list/product-list.component';
import { ProductsDetailsComponentComponent } from './features/products/products-details-component/products-details-component.component';
import { CartComponent } from './features/cart/cart/cart.component';
import { FavoritesComponent } from './features/favorites/favorites/favorites.component';
import { HeroComponent } from './features/hero/hero.component';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { favoritesReducer } from './store/favorites/favorites.reducer';
import { getInitialFavoritesState } from './store/meta-reducers/local-storage.reducer';
import { HttpLoaderFactory } from './translate-loader';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpInterceptorService } from './core/interceptors/http.interceptor';
import { CartEffects } from './store/cart/cart.effects';
import { FavoritesEffects } from './store/favorites/favorites.effects';

@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    ProductsDetailsComponentComponent,
    CartComponent,
    FavoritesComponent,
    HeroComponent,
  ],
  imports: [
    BrowserModule,
    SharedModule,

    AppRoutingModule,
    StoreModule.forRoot<AppState>(
      {
        products: productsReducer,
        productDetail: productDetailReducer,
        cart: cartReducer,
        favorites: favoritesReducer,
      },
      {
        metaReducers,
        initialState: {
          cart: getInitialCartState(),
          favorites: getInitialFavoritesState(),
        },
      },
    ),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
    EffectsModule.forRoot([ProductsEffects, ProductDetailEffects, CartEffects, FavoritesEffects]),
    HttpClientModule,
    NavbarComponent,
    RouterModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpInterceptorService,
      multi: true, 
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
