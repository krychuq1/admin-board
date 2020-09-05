import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {IOrder} from '../../interfaces/IOrder';
import {FormControl, Validators} from '@angular/forms';
import {OrdersService} from '../../services/orders.service';

@Component({
  selector: 'app-ship-order',
  templateUrl: './ship-order.component.html',
  styleUrls: ['./ship-order.component.scss']
})
export class ShipOrderComponent implements OnInit {
  trackingLink = new FormControl('', [Validators.required]);
  loading = false;
  constructor(
    private orderService: OrdersService,
    @Inject(MAT_DIALOG_DATA) public data: IOrder,
    public dialogRef: MatDialogRef<ShipOrderComponent>,
  ) { }

  ngOnInit(): void {
  }
  close($event) {
    this.dialogRef.close();
  }
  async shipOrder() {
    this.loading = true;
    await this.orderService.shipOrders(this.data.id, this.trackingLink.value);
    this.dialogRef.close();
    // console.log(this.trackingLink.value);
  }
}
