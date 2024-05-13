import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { LoginResponse } from '../../types/login-response.type';
import { UrlConfig } from '../../config/url.config';
import { SignUpForm } from '../../models/singnup-form.model';

@Injectable({
  providedIn: 'root'
})
export class SingUpService {
  public urlApi: UrlConfig = new UrlConfig();

  //public urlApi: string = 'htpp://localhost:8080/auth';

  private readonly _httpClient = inject(HttpClient);

  public singUp(singnup: SignUpForm): Observable<LoginResponse> {
    return this._httpClient.post<LoginResponse>(this.urlApi.urlSingUp, { singnup }).pipe(
      tap((value) => {
        sessionStorage.setItem('auth-token', value.token)
        sessionStorage.setItem('username', value.name)
      })
    )
  }
}
