import {Component, Input, OnInit} from '@angular/core';
import {IProduct} from '../../../interfaces/IProduct';
import {ProductsService} from "../../../services/products.service";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  @Input() product: IProduct;
  @Input() index: number;
  public isOnProd: boolean;

  constructor(private productService: ProductsService) { }

  async ngOnInit() {
    this.isOnProd = !!await this.checkIfProductOnProd();
  }
  async checkIfProductOnProd() {
    return await this.productService.checkIfProductOnProd(this.product.id);
  }
}
