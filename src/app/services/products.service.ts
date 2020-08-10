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
  async getProductsPagination(numberOfProducts: number, page: number) {
    try {
      return await this.http.get(this.url + '/pagination/' + numberOfProducts + '/' + page).toPromise() as IProductsPagination;
    } catch (e) {
      console.log(e);
    }
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
}
