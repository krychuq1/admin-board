import { Component, OnInit } from '@angular/core';
import {OrdersService} from '../../../../services/orders.service';
import {IOrder} from '../../../../interfaces/IOrder';

@Component({
  selector: 'app-order-dashboard',
  templateUrl: './order-dashboard.component.html',
  styleUrls: ['./order-dashboard.component.scss']
})
export class OrderDashboardComponent implements OnInit {
  loading = true;
  orders: IOrder[];
  constructor(private ordersService: OrdersService ) {

  }

  async ngOnInit() {
    this.orders = await this.ordersService.getOrders();
    console.log(this.orders);
    this.loading = false;
  }

}
