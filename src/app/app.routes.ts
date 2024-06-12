import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { SignUpComponent } from './pages/singnup/singnup.component';
import { UserComponent } from './pages/user/user.component';
import { AuthGuardService } from './services/auth-guard/auth-guard.service';
import { ProductDetailsComponent } from './pages/product-details/product-details.component';
import { EditUserComponent } from './pages/edit-user/edit-user.component';
import { CartComponent } from './pages/cart/cart.component';
import { PaymentComponent } from './pages/payment/payment.component';
import { OrderSummaryComponent } from './pages/order-sumary/order-sumary.component';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'cart',
    component: CartComponent
  },
  {
    path: 'singnup',
    component: SignUpComponent
  },
  {
    path: 'edit-user',
    component: EditUserComponent
  },
  {
    path: 'payment',
    component: PaymentComponent
  },
  {
    path: 'order-sumary',
    component: OrderSummaryComponent
  },
  {
    path: 'user',
    component: UserComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'product-details/:id',
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
  },


];
