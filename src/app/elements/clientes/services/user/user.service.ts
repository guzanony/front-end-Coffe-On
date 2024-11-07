import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { EditProfileFormModel } from '../../models/singnup-form.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private readonly baseUrl: string = 'http://localhost:8080/auth/cliente';

  private readonly _http = inject(HttpClient);

  public getUser(name: string | null): Observable<EditProfileFormModel> {
    return this._http.get<EditProfileFormModel>(`${this.baseUrl}/me?nomeCompleto=${name}`);
  }

  updateUser(nomeCompleto: string | null, profile: EditProfileFormModel): Observable<void> {
    return this._http.put<void>(`${this.baseUrl}/me?nomeCompleto=${nomeCompleto}`, profile);
  }
}
