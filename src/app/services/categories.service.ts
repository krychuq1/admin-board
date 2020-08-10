import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ICategory} from '../interfaces/ICategory';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  public categoryUrl = environment.baUrl + 'category';
  constructor(private http: HttpClient) { }
  async getCategories() {
    return await this.http.get(this.categoryUrl).toPromise() as ICategory[];
  }
}
