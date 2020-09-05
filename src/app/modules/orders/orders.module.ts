import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderDashboardComponent } from './components/order-dashboard/order-dashboard.component';
import {SharedModule} from '../shared/shared.module';
import {routing} from './orders-routing.module';
import { OrderThumbnailComponent } from './components/order-dashboard/order-thumbnail/order-thumbnail.component';
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';



@NgModule({
  declarations: [OrderDashboardComponent, OrderThumbnailComponent],
  imports: [
    CommonModule,
    SharedModule,
    MatButtonModule,
    MatDialogModule,
    routing
  ]
})
export class OrdersModule { }
