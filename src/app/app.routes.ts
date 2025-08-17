import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './register/register';
import { Login } from './login/login';
import { ProductList } from './product-list/product-list';
import { AddProduct } from './add-product/add-product';
import { AuthGuard } from './auth-guard';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';


export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: Login },
  { path: 'products', component: ProductList },
  { path: 'add-product', component: AddProduct, canActivate: [AuthGuard] },
];