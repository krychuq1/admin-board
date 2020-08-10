import { Component, OnInit } from '@angular/core';
import {IProductsPagination} from '../../interfaces/IProductsPagination';
import {ProductsService} from '../../services/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  productsPagination: IProductsPagination;
  page = 1;
  itemsOnPage = 8;
  numberOfPages;
  loading = false;
  constructor(private productsService: ProductsService) { }

  async ngOnInit() {
    this.loading = true;
    this.productsPagination = await this.productsService.getProductsPagination(this.itemsOnPage, this.page);
    this.setNumberOfPages();
    this.loading = false;  }
  async nextPage() {
    if (this.page < this.numberOfPages) {
      this.page++;
      await this.getProductsOnPage();
    }
  }
  async prevPage() {
    if (this.page > 1) {
      this.page--;
      await this.getProductsOnPage();
    }
  }
  async getProductsOnPage() {
    this.productsPagination = await this.productsService.getProductsPagination(this.itemsOnPage, this.page);
    this.setNumberOfPages();
  }
  private setNumberOfPages() {
    console.log(this.productsPagination);
    this.numberOfPages = Math.ceil(this.productsPagination.count / this.itemsOnPage);
  }
}
