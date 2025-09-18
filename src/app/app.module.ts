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

import { HeroComponent } from './features/hero/hero.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { favoritesReducer } from './store/favorites/favorites.reducer';
import { getInitialFavoritesState } from './store/meta-reducers/local-storage.reducer';
import { HttpLoaderFactory } from './translate-loader';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpInterceptorService } from './core/interceptors/http.interceptor';
import { CartEffects } from './store/cart/cart.effects';
import { FavoritesEffects } from './store/favorites/favorites.effects';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { ProductsModule } from './features/products/products.module';
import { CartModule } from './features/cart/cart.module';
import { FavoritesModule } from './features/favorites/favorites.module';
import { ScrollingModule } from '@angular/cdk/scrolling';

@NgModule({
  declarations: [
    AppComponent,

    HeroComponent,
  ],
  imports: [
    BrowserModule,
    ScrollingModule,
    NavbarComponent,
    SharedModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule,
    ProductsModule,
    CartModule,
    FavoritesModule,
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
    EffectsModule.forRoot([
      ProductsEffects,
      ProductDetailEffects,
      CartEffects,
      FavoritesEffects,
    ]),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
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
