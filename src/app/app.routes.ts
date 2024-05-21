import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { SignUpComponent } from './pages/singnup/singnup.component';
import { UserComponent } from './pages/user/user.component';
import { AuthGuardService } from './services/auth-guard/auth-guard.service';
import { ProductDetailsComponent } from './pages/product-details/product-details.component';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'singnup',
    component: SignUpComponent
  },
  {
    path: 'user',
    component: UserComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'product-details',
    component: ProductDetailsComponent,
  },
  {
    path: '',
    redirectTo: 'user',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: 'user'
  }
];
