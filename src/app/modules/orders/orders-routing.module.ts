import {RouterModule, Routes} from '@angular/router';
import {ModuleWithProviders} from '@angular/core';
import {OrderDashboardComponent} from './components/order-dashboard/order-dashboard.component';

export const routes: Routes = [
  {path: '', component: OrderDashboardComponent},
];
export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
