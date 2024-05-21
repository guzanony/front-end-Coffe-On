import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ViaCepService {
  private readonly API_URL: string = 'https://viacep.com.br/ws';
  private readonly _http = inject(HttpClient);

  getCep(cep: string): Observable<any> {
    console.log(`Chamando API ViaCep para o CEP: ${cep}`);
    return this._http.get(`${this.API_URL}/${cep}/json/`);
  }
}
