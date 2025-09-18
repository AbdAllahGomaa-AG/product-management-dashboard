import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { FavoritesComponent } from './favorites/favorites.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { Routes } from '@angular/router';
const routes: Routes = [
  { path: '', component: FavoritesComponent },
];

@NgModule({
  declarations: [FavoritesComponent],
  imports: [
    CommonModule,
    RouterModule,
    TranslateModule,
    SharedModule,
    RouterModule.forChild(routes),
  ],
  exports: [FavoritesComponent],
})
export class FavoritesModule {}
