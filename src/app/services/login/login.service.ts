import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { LoginResponse } from '../../types/login-response.type';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  public urlAPi: string = 'http://localhost:8080/auth';

  private readonly _httpClient = inject(HttpClient);

  public login(email: string | null | undefined, password: string | null | undefined): Observable<LoginResponse> {
    return this._httpClient.post<LoginResponse>(this.urlAPi + '/loginCliente', { email, password }).pipe(
      tap((value) => {
        sessionStorage.setItem('auth-token', value.token)
        sessionStorage.setItem('username', value.name)
      })
    )
  }
}
