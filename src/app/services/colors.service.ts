import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {IColor} from '../interfaces/IColor';
@Injectable({
  providedIn: 'root'
})
export class ColorsService {
  public url = environment.baUrl + 'color';

  constructor(private http: HttpClient) {}
  async getColors() {
    return await this.http.get(this.url).toPromise() as IColor[];
  }
}
