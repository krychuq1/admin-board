import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {IProduct} from '../interfaces/IProduct';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {IProductsPagination} from '../interfaces/IProductsPagination';
import {CookieService} from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  public products: IProduct[];
  public url = environment.baUrl + 'products';
  private sorting = 'newest';
  constructor(private http: HttpClient, private cookieService: CookieService) {}
  async checkIfProductOnProd(id: string) {
    console.log(id);
    const header = new HttpHeaders({Authorization: `Bearer ${this.cookieService.get('admin_token')}`});
    const httpOptions = {
      headers: header
    };
    return await this.http.get(this.url + '/checkIfProductOnProd/' + id, httpOptions).toPromise();
  }
  async getProductsPagination(numberOfProducts: number, page: number) {
    try {
      return await this.http.get(this.url + '/pagination/' + numberOfProducts + '/' + page).toPromise() as IProductsPagination;
    } catch (e) {
      console.log(e);
    }
  }
  async getProductByFilters(filtersMap: any, numberOfProducts: number, page: number) {
    console.log('getting products by filters ', this.sorting);
    const url = this.url + '/admin/filters/' + numberOfProducts + '/' + page + '/' + this.sorting;
    return await this.http.post(url, this.convertMap(filtersMap)).toPromise() as IProductsPagination;
  }

  async removeFile(url: string, id: string) {
    const header = new HttpHeaders({Authorization: `Bearer ${this.cookieService.get('admin_token')}`});
    const httpOptions = {
      headers: header
    };
    return await this.http.post(this.url + '/file-remove', {url, id}, httpOptions  ).toPromise();
  }
  async getProductById(id: string) {
    return  await this.http.get(this.url + '/' + id).toPromise() as IProduct;
  }
  async updateProduct(product: IProduct) {
    const header = new HttpHeaders({Authorization: `Bearer ${this.cookieService.get('admin_token')}`});
    const httpOptions = {
      headers: header
    };
    return await this.http.put(this.url + '/' + product.id, product, httpOptions).toPromise();
  }
  async addProduct(product: IProduct) {
    const header = new HttpHeaders({Authorization: `Bearer ${this.cookieService.get('admin_token')}`});
    const httpOptions = {
      headers: header
    };
    return await this.http.post(this.url, product, httpOptions).toPromise() as IProduct;
  }
  async addProductToProd(product: IProduct) {
    console.log(product);
    const header = new HttpHeaders({Authorization: `Bearer ${this.cookieService.get('admin_token')}`});
    const httpOptions = {
      headers: header
    };
    return await this.http.post(this.url + '/addProductToProd', product, httpOptions).toPromise() as IProduct;
  }
  private convertMap(filtersMap) {
    const filters = {};
    filtersMap.forEach((val, key) => {
      if (val instanceof Map) {
        const arrayOfItems = [];
        val.forEach((v, k) => {
          arrayOfItems.push(v.id ? v.id : v);
        });
        filters[key] = arrayOfItems;
      } else {
        filters[key] = val;
      }
    });
    return filters;
  }
}
