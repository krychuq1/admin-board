import { Component, OnInit } from '@angular/core';
import {IProductsPagination} from '../../interfaces/IProductsPagination';
import {ProductsService} from '../../services/products.service';

@Component({
  selector: 'app-dash-board',
  templateUrl: './dash-board.component.html',
  styleUrls: ['./dash-board.component.scss']
})
export class DashBoardComponent implements OnInit {

  constructor(public productsService: ProductsService) { }

  async ngOnInit() {

  }

}
