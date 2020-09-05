import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {CookieService} from 'ngx-cookie-service';
import {IOrder} from '../interfaces/IOrder';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  public url = environment.baUrl + 'orders';

  constructor(private http: HttpClient, private cookieService: CookieService) {
  }
  async getOrders(): Promise<IOrder[]> {
    const header = new HttpHeaders({Authorization: `Bearer ${this.cookieService.get('admin_token')}`});
    const httpOptions = {
      headers: header
    };
    return await this.http.get(this.url, httpOptions).toPromise() as IOrder[];
  }
  async shipOrders(id: string, trackingLink: string) {
    const header = new HttpHeaders({Authorization: `Bearer ${this.cookieService.get('admin_token')}`});
    const httpOptions = {
      headers: header
    };
    return await this.http.patch(this.url + '/shipOrder/' + id, {
      trackingLink
    }, httpOptions).toPromise() as IOrder[];

  }
}
