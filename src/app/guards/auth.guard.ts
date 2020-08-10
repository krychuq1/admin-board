import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import { Observable } from 'rxjs';
import {UserService} from '../services/user.service';
import {CookieService} from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private userService: UserService,
              private router: Router,
              private cookieService: CookieService) {
  }
  async canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) {
    if (this.userService.isLoggedIn) {
      return true;
    } else {
      const token = this.cookieService.get('admin_token');
      if (token) {
        await this.userService.checkToken(token);
        if (this.userService.isLoggedIn) {
          return true;
        } else {
          this.router.navigate(['/auth/login'], {queryParams: {redirectURL: state.url}});
          return false;
        }
      } else {
        this.router.navigate(['/auth/login'], {queryParams: {redirectURL: state.url}});
        return false;
      }
    }
  }
}
