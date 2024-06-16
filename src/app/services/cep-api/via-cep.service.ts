import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ViaCepService {

  private readonly baseUrlApi: string = 'https://viacep.com.br/ws';

  private readonly _http = inject(HttpClient);

  public getCep(cep: string): Observable<any> {
    return this._http.get(`${this.baseUrlApi}/${cep}/json/`);
  }
}
