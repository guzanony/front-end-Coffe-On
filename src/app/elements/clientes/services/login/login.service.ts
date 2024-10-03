import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { LoginResponse } from '../../types/login-response.type';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private readonly baseUrlApi: string = 'http://localhost:8080/auth';

  private readonly _http = inject(HttpClient);

  public login(email: string | null | undefined, password: string | null | undefined): Observable<LoginResponse> {
    return this._http.post<LoginResponse>(this.baseUrlApi + '/loginCliente', { email, password }).pipe(
      tap((value) => {
        sessionStorage.setItem('username', value.name);
        sessionStorage.setItem('nomeCompleto', value.nomeCompleto);
        sessionStorage.setItem('clienteId', value.clienteId.toString());
      })
    )
  }
}
