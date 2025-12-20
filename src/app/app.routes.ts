import { Routes } from '@angular/router';
import { Login } from '../pages/login/login';
import { Register } from '../pages/register/register';
import { Home } from '../pages/home/home';
import { AuthGuard } from '../Auth/auth-guard';
import { Cart } from '../Components/cart/cart';
import { ProductListComponent } from '../Components/products/products';
import { Navbar } from '../Components/navbar/navbar';
export const routes: Routes = [
    {
        path:'',
        component:Login
    },
    {
        path:'register',
        component:Register
    },
    {
        path:'navbar',
        component:Navbar,
        canActivate:[AuthGuard],
        children:[
            {
                path:'cart',
                component:Cart,
                canActivate:[AuthGuard]
            },
            {
                path:'products',
                component:ProductListComponent,
                // canActivate:[AuthGuard]
            }
        ]
    },
    
];
