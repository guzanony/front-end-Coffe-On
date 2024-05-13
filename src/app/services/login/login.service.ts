import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { LoginResponse } from '../../types/login-response.type';
import { UrlConfig } from '../../config/url.config';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  public urlAPi: UrlConfig = new UrlConfig();

  //public urlApi: string = 'htpp://localhost:8080/auth';

  private readonly _httpClient = inject(HttpClient);

  public login(email: string, password: string): Observable<LoginResponse> {
    return this._httpClient.post<LoginResponse>(this.urlAPi.urlLogin, { email, password }).pipe(
      tap((value) => {
        sessionStorage.setItem('auth-token', value.token)
        sessionStorage.setItem('username', value.name)
      })
    )
  }
}
