import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
import {ActivatedRoute, Router} from '@angular/router';
import {IAuth} from '../../../interfaces/IAuth';
import {UserService} from '../../../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;
  public loading = false;
  public showPassword =  false;
  public redirectUrl;

  constructor(private toastr: ToastrService, private userService: UserService,
              private router: Router, private activatedRoute: ActivatedRoute) {
    this.redirectUrl = this.activatedRoute.snapshot.queryParams.redirectURL;
    this.loginForm = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit(): void {
  }
  async onSubmit() {
    this.loading = true;
    const userDto: IAuth = {
      username: this.loginForm.value.username,
      password: this.loginForm.value.password,
    };
    if (await this.userService.loginUser(userDto)) {
      this.toastr.success('login success');
      this.loading = false;
      if (this.redirectUrl) {
        this.router.navigateByUrl(this.redirectUrl).catch(() => {
          this.router.navigate(['/']);
        });
      } else {
        this.router.navigate(['/']);
      }
    } else {
      this.toastr.error('Login failed');
      this.loading = false;
    }

  }
}
