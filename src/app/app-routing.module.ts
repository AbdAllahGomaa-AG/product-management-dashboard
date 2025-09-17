import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductListComponent } from './features/products/product-list/product-list.component';
import { ProductsDetailsComponentComponent } from './features/products/products-details-component/products-details-component.component';
import { CartComponent } from './features/cart/cart/cart.component';
import { FavoritesComponent } from './features/favorites/favorites/favorites.component';
import { HeroComponent } from './features/hero/hero.component';

const routes: Routes = [
  {
    path: '',
    component: HeroComponent,
  },
  {
    path: 'products',
    component: ProductListComponent,
  },
  {
    path: 'productsDetails/:id',
    component: ProductsDetailsComponentComponent,
  },
  {
    path: 'cart',
    component: CartComponent,
  },
  {
    path: 'favorites',
    component: FavoritesComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
