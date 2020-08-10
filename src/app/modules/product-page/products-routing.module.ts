import {RouterModule, Routes} from '@angular/router';
import {ModuleWithProviders} from '@angular/core';
import {ProductPageComponent} from './components/product-page/product-page.component';

export const routes: Routes = [
  {path: '', component: ProductPageComponent},
  {path: ':id', component: ProductPageComponent}
];
export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
