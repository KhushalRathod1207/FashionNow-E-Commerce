import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { CollectionComponent } from './pages/collection/collection.component';
import { AboutComponent } from './pages/about/about.component';
import { ContactComponent } from './pages/contact/contact.component';
import { ProductComponent } from './pages/product/product.component';
import { CartComponent } from './pages/cart/cart.component';
import { LoginComponent } from './pages/login/login.component';
import { PlaceOrderComponent } from './pages/place-order/place-order.component';
import { OrdersComponent } from './pages/orders/orders.component';
import { VerifyComponent } from './pages/verify/verify.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'collection', component: CollectionComponent },
  { path: 'about', component: AboutComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'product/:productId', component: ProductComponent },
  { path: 'cart', component: CartComponent },
  { path: 'login', component: LoginComponent },
  { path: 'profile', component: ProfileComponent, canActivate: [authGuard] },
  { path: 'place-order', component: PlaceOrderComponent, canActivate: [authGuard] },
  { path: 'orders', component: OrdersComponent, canActivate: [authGuard] },
  { path: 'verify', component: VerifyComponent },
  { path: '**', redirectTo: '' }
];
