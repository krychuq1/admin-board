import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ICategory} from '../interfaces/ICategory';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  public categoryUrl = environment.baUrl + 'category';
  public categories: ICategory[];

  constructor(private http: HttpClient) { }
  async getCategories() {
    this.categories = await this.http.get(this.categoryUrl).toPromise() as ICategory[];
    return this.categories;
  }
  async getCategoryById(id: number) {
    if (!this.categories) {
      await this.getCategories();
    }
    console.log(this.categories, '<--- here')
    return this.categories.filter(item => {
      //on perpuse!
      return item.id == id;
    })[0];
  }
}
