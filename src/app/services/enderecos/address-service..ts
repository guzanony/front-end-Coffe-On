import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AddressService {

  private baseUrl = 'http://localhost:8080/auth';

  private readonly _http = inject(HttpClient);

  public getUserAddresses(clienteId: number): Observable<any> {
    return this._http.get(`${this.baseUrl}/${clienteId}/enderecos`);
  }
}
