import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { productsReducer } from './store/products/products.reducer';
import { ProductListComponent } from './features/products/product-list/product-list.component';
import { EffectsModule } from '@ngrx/effects';
import { ProductsEffects } from './store/products/products.effects';
import { HttpClientModule } from '@angular/common/http';
import { NavbarComponent } from "./shared/components/navbar/navbar.component";
import { SharedModule } from "src/app/shared/shared.module";


@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot({ products: productsReducer }),
    EffectsModule.forRoot([ProductsEffects]),
    HttpClientModule,
    NavbarComponent,
    SharedModule
],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
