import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './modules/login/login/login.component';
import {DashBoardComponent} from './components/dash-board/dash-board.component';
import {AuthGuard} from './guards/auth.guard';
import {TranslateModule} from '@ngx-translate/core';


const routes: Routes = [
  {path: '', component: DashBoardComponent, canActivate: [AuthGuard]},
  {path: 'orders', loadChildren: () => import('./modules/orders/orders.module').then(m => m.OrdersModule)},
  {path: 'category/:categoryId', component: DashBoardComponent, canActivate: [AuthGuard]},
  {path: 'search/:query', component: DashBoardComponent, canActivate: [AuthGuard]},
  {path: 'auth/login', loadChildren: () => import('./modules/login/login.module').then(m => m.LoginModule)},
  {path: 'product', loadChildren: () => import('./modules/product-page/product-page.module').then(m => m.ProductPageModule)},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule, TranslateModule]
})
export class AppRoutingModule { }
