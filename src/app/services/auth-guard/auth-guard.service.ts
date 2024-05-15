import { Injectable, inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, GuardResult, MaybeAsync, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  private readonly _router = inject(Router);

  public canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const authToken = sessionStorage.getItem('auth-token');
    if (authToken) {
      return true;
    } else {
      this._router.navigate(['/login']);
      return false;
    }
  }
}
