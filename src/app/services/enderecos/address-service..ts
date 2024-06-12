import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Address } from '../../models/singnup-form.model';

@Injectable({
  providedIn: 'root'
})
export class AddressService {

  private baseUrl = 'http://localhost:8080/auth';

  private readonly _http = inject(HttpClient);

  public getUserAddresses(clienteId: number): Observable<Address[]> {
    return this._http.get<Address[]>(`${this.baseUrl}/${clienteId}/enderecos`);
  }

  public addAddress(clienteId: number, address: Address): Observable<Address> {
    return this._http.post<Address>(`${this.baseUrl}/${clienteId}/enderecos`, address);
  }
}
