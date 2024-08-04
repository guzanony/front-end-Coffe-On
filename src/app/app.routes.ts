import { Routes, RouterOutlet } from '@angular/router';
import { LoginComponent } from './elements/clientes/pages/login/login.component';
import { SignUpComponent } from './elements/clientes/pages/singnup/singnup.component';
import { UserComponent } from './elements/clientes/pages/user/user.component';
import { ProductDetailsComponent } from './elements/clientes/pages/product-details/product-details.component';
import { EditUserComponent } from './elements/clientes/pages/edit-user/edit-user.component';
import { CartComponent } from './elements/clientes/pages/cart/cart.component';
import { PaymentComponent } from './elements/clientes/pages/payment/payment.component';
import { OrderSummaryComponent } from './elements/clientes/pages/order-sumary/order-sumary.component';
import { OrdersListComponent } from './elements/clientes/pages/order-list/order-list.component';
import { OrderDetailsComponent } from './elements/clientes/pages/order-details/order-details.component';
import { AuthGuardService } from './elements/clientes/services/auth-guard/auth-guard.service';
import { LoginUserComponent } from './elements/usuarios/pages/login/login.component';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
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
    path: 'order-details/:id',
    component: OrderDetailsComponent
  },
  {
    path: 'orders-list',
    component: OrdersListComponent
  },
  {
    path: 'customer',
    component: UserComponent
  },
  {
    path: 'product-details/:id',
    component: ProductDetailsComponent,
  },


  // ELEMENT USUARIOS


  {
    path: 'loginUser',
    component: LoginUserComponent,
  }
];
