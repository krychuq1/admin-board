import {Component, Input, OnInit} from '@angular/core';
import {IOrder} from '../../../../../interfaces/IOrder';
import {OrdersService} from '../../../../../services/orders.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-order-thumbnail',
  templateUrl: './order-thumbnail.component.html',
  styleUrls: ['./order-thumbnail.component.scss']
})
export class OrderThumbnailComponent implements OnInit {
  @Input() order: IOrder;
  loading = false;
  constructor(private orderService: OrdersService, private toastr: ToastrService) { }

  ngOnInit(): void {
  }
  getUserEmail(): string {
    return this.order.user ? this.order.user.username : this.order.userGuest.username;
  }
  async shipOrder() {
    this.loading = true;
    await this.orderService.shipOrders(this.order.id);
    this.toastr.success('updated zamówienie wysłane');
    this.loading = false;
  }
}
