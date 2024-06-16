import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private readonly baseUrlApi: string = 'http://localhost:8080/products';

  private readonly _http = inject(HttpClient);

  public getProducts(): Observable<any> {
    return this._http.get(`${this.baseUrlApi}`);
  }

  public getProductImageUrl(id: number): Observable<Blob> {
    return this._http.get(`${this.baseUrlApi}/image/${id}`, { responseType: 'blob' });
  }

}
