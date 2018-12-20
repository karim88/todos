import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {AuthenticationService} from '../../../../services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  model: any = {};

  constructor(public auth: AuthenticationService,
              public toastr: ToastrService,
              public router: Router) { }

  ngOnInit() {
  }

  onSubmit() {
    const email = this.model.email;
    const password = this.model.password;
    this.auth.login(email, password).subscribe((d: any) => {
      const user = d.success.user;
      localStorage.setItem('accessToken', d.success.token);
      localStorage.setItem('userId', user.id);
      this.toastr.success(`Hello ${user.name.toUpperCase()}`);
      window.location.reload();
    }, error1 => {
      this.toastr.error('Email or Password are incorrect!');
    });
  }
}
