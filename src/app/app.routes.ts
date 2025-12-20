import { Routes } from '@angular/router';
import { Login } from '../pages/login/login';
import { Register } from '../pages/register/register';
import { Home } from '../pages/home/home';
import { AuthGuard } from '../Auth/auth-guard';
import { Cart } from '../Components/cart/cart';
import { ProductComponent } from '../Components/products/products';
export const routes: Routes = [
    {
        path: '',
        component: Login
    },
    {
        path: 'register',
        component: Register
    },

    {
        path: 'home',
        component: Home,
        canActivate: [AuthGuard],
        children: [
            {
                path: 'products/:category',
                component: ProductComponent,
                canActivate: [AuthGuard]
            },
            {
                path: 'cart',
                component: Cart,
                canActivate: [AuthGuard]
            },
        ]
    }

];
