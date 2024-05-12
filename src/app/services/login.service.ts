import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { LoginResponse } from '../types/login-response.type';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private readonly _httpClient = inject(HttpClient);

  public login(name: string, password: string): Observable<LoginResponse> {
    return this._httpClient.post<LoginResponse>('/login', { name, password }).pipe(
      tap((value) => {
        sessionStorage.setItem('auth-token', value.token)
        sessionStorage.setItem('username', value.name)
      })
    )
  }
}
