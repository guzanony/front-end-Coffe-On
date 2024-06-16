import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Address } from '../../models/singnup-form.model';

@Injectable({
  providedIn: 'root'
})
export class AddressService {

  private readonly baseUrlApi: string = 'http://localhost:8080/auth';

  private readonly _http = inject(HttpClient);

  public getUserAddresses(clienteId: number): Observable<Address[]> {
    return this._http.get<Address[]>(`${this.baseUrlApi}/${clienteId}/enderecos`);
  }

  public addAddress(clienteId: number, address: Address): Observable<Address> {
    return this._http.post<Address>(`${this.baseUrlApi}/${clienteId}/enderecos`, address);
  }
}
