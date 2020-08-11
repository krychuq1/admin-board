import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {CookieService} from 'ngx-cookie-service';
import {IAuth} from '../interfaces/IAuth';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient, private cookieService: CookieService) { }
  public user: any;
  public authUrl = environment.baUrl + 'auth';
  public isLoggedIn = false;
  async loginUser(userDto: IAuth) {
    try {
      const token: any = await this.http.post(this.authUrl + '/login', userDto).toPromise();
      this.cookieService.set('admin_token', token.access_token);
      this.user = token.user;
      this.isLoggedIn = true;
      return true;
    } catch (e) {
      return false;
    }
  }

  async checkToken(token: string) {
    const header = new HttpHeaders({Authorization: `Bearer ${token}`});
    const httpOptions = {
      headers: header
    };
    try {
      this.user = await this.http.post(this.authUrl + '/validateToken', {}, httpOptions).toPromise();
      this.isLoggedIn = true;
    } catch (e) {
      this.isLoggedIn = false;
      console.log(e);
    }
  }
}
