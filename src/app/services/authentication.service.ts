import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private interruptedUrl: string;

  private headers = new HttpHeaders({ 'Content-Type': 'application/json', 'charset': 'UTF-8' });
  private options = {
    headers: this.headers
  };

  constructor(private http: HttpClient) { }

  public isAuthorized(): Observable<boolean> {
    const isAuthorized: boolean = !!localStorage.getItem('accessToken');

    return of(isAuthorized);
  }

  public getAccessToken(): Observable<string> {
    const accessToken: string = localStorage.getItem('accessToken');

    return of(accessToken);
  }

  public getToken(): String {
    return localStorage.getItem('accessToken');
  }

  public refreshToken(): Observable<any> {
    const refreshToken: string = localStorage.getItem('refreshToken');

    return this.http
      .post(`${environment.apiUrl}/api/refresh-token`, { refreshToken });
    // .catchError(() => this.logout());
  }

  public refreshShouldHappen(response: HttpErrorResponse): boolean {
    return response.status === 401;
  }

  public verifyTokenRequest(url: string): boolean {
    return url.endsWith('refresh-token');
  }

  public getInterruptedUrl(): string {
    this.interruptedUrl = '/login';
    return this.interruptedUrl;
  }

  public setInterruptedUrl(url: string): void {
    this.interruptedUrl = url;
  }

  public login(email: string, password: string) {
    return this.http.post(`${environment.apiUrl}/api/login`,
      JSON.stringify({ email: email.toLowerCase(), password: password }),
      this.options);
  }

  public register(user: any) {
    return this.http.post(`${environment.apiUrl}/api/register`, JSON.stringify(user), this.options);
  }

  public logout() {
    localStorage.removeItem('accessToken');
  }
}
