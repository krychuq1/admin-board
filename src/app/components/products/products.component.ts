import { Component, OnInit } from '@angular/core';
import {IProductsPagination} from '../../interfaces/IProductsPagination';
import {ProductsService} from '../../services/products.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ICategory} from '../../interfaces/ICategory';
import {CategoriesService} from '../../services/categories.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  productsPagination: IProductsPagination;
  page = 1;
  itemsOnPage = 30;
  numberOfPages;
  loading = false;
  filters = new Map();
  parentCategory: ICategory;

  constructor(private productsService: ProductsService,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              private categoryService: CategoriesService
              ) { }

  async ngOnInit() {
    this.loading = true;
    console.log('params', this.activatedRoute.snapshot.params);
    if (this.activatedRoute.snapshot.params.categoryId) {
      await this.getParentAndChildCategory(this.activatedRoute.snapshot.params.categoryId);
    }
    if (this.activatedRoute.snapshot.params.query) {
      this.filters.set('searchFilter', this.activatedRoute.snapshot.params.query);
    }
    if (this.activatedRoute.snapshot.queryParams.page) {
      this.page = this.activatedRoute.snapshot.queryParams.page;
    } else {
      this.page = 1;
    }
    this.productsPagination = await this.productsService.getProductByFilters(this.filters, this.itemsOnPage, this.page);

    this.setNumberOfPages();
    this.loading = false;  }
  async nextPage() {
    if (this.page < this.numberOfPages) {
      this.page++;
      await this.getProductsOnPage();
      this.addPageParam();
      this.scrollToTop();
    }
  }
  async prevPage() {
    if (this.page > 1) {
      this.page--;
      await this.getProductsOnPage();
      this.addPageParam();
      this.scrollToTop();
    }
  }
  private scrollToTop() {
    document.getElementById('header')
      .scrollIntoView({behavior: 'smooth'});
  }
  addPageParam(){
    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams: {
        page: this.page
      },
      queryParamsHandling: 'merge',
    });
  }
  async getProductsOnPage() {
    this.productsPagination = await this.productsService.getProductByFilters(this.filters, this.itemsOnPage, this.page);
    this.setNumberOfPages();
  }
  private setNumberOfPages() {
    console.log(this.productsPagination);
    this.numberOfPages = Math.ceil(this.productsPagination.count / this.itemsOnPage);
  }
  private async getParentAndChildCategory(categoryId: string) {
    const catId = Number(categoryId);
    if (!isNaN(catId)) {
      this.parentCategory = await this.categoryService.getCategoryById(catId);
      this.setParentCategoryFilter();
    }

  }
  private setParentCategoryFilter() {
    // set parent category filter with children
    const arr = [];
    arr.push(this.parentCategory.id);
    this.filters.set('parentCategory', arr);
  }
}
