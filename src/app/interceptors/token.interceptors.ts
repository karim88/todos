import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from '../services/authentication.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  id: string;

  constructor(public auth: AuthenticationService,
              public toastr: ToastrService,
              public router: Router) {
    this.id = localStorage.getItem('userId');
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.auth.getToken()) {
      const headers = {
        Authorization: `Bearer ${this.auth.getToken()}`,
        UserId: this.id,
        Charset: 'UTF-8'
      };
      request = request.clone({
        setHeaders: headers
      });
    }
    return next.handle(request);
  }
}
