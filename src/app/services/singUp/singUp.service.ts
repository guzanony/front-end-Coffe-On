import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { tap } from 'rxjs';
import { LoginResponse } from '../../types/login-response.type';

@Injectable({
  providedIn: 'root'
})
export class SingUpService {

  private readonly baseUrlApi: string = 'http://localhost:8080/auth';

  private readonly _http = inject(HttpClient);

  public signUp(signUpData: Partial<{
    nomeCompleto: string | null | undefined;
    dataNascimento: string | null | undefined;
    genero: string | null | undefined;
    cepFaturamento: string | null | undefined;
    logradouroFaturamento: string | null | undefined;
    numeroFaturamento: string | null | undefined;
    complementoFaturamento?: string | null | undefined;
    bairroFaturamento: string | null | undefined;
    cidadeFaturamento: string | null | undefined;
    ufFaturamento: string | null | undefined;
    password: string | null | undefined;
    email: string | null | undefined;
    cpf: string | null | undefined;
    cep: string | null | undefined;
    logradouro: string | null | undefined;
    numero: string | null | undefined;
    complemento?: string | null | undefined;
    bairro: string | null | undefined;
    cidade: string | null | undefined;
    uf: string | null | undefined;
  }>) {
    return this._http.post<LoginResponse>(this.baseUrlApi + '/registerCliente', signUpData).pipe(
      tap((value) => {
        console.log('URL da API:', this.baseUrlApi);
        console.log('Token JWT:', localStorage.getItem('auth-token'));
        sessionStorage.setItem('auth-token', value.token);
        sessionStorage.setItem('username', value.name);
        sessionStorage.setItem('nomeCompleto', value.nomeCompleto);
      })
    );
  }
}
