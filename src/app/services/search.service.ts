import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { IProduct } from '../interfaces/IProduct';
import { ICategory } from '../interfaces/ICategory';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  public products: IProduct[];
  public url = environment.baUrl + 'products';
  public categoryUrl = environment.baUrl + 'category';
  constructor(private http: HttpClient) {}
  async searchForProduct(query: string, limit: string) {
    return await this.http.get(this.url + '/search/' + query + '/' + limit).toPromise() as IProduct[];
  }
  async searchForCategory(query: string) {
    return await this.http.get(this.categoryUrl + '/search/' + query).toPromise() as ICategory[];
  }
}
