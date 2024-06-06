import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private readonly API_URL_PRODUCT = 'http://localhost:8080/products';

  private readonly _http = inject(HttpClient);

  public getProducts(): Observable<any> {
    return this._http.get(`${this.API_URL_PRODUCT}`);
  }

  public getProductImageUrl(id: number): Observable<Blob> {
    return this._http.get(`${this.API_URL_PRODUCT}/image/${id}`, { responseType: 'blob' });
  }

}
