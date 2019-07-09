import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { Routes, RouterModule } from '@angular/router';
import { CartPanelComponent } from './cart-panel/cart-panel.component';


const routes: Routes = [
  {path: '', component: AdminComponent, children: [
    {path: 'dashboard', loadChildren: () => import('./dashboard/dashboard.module').then( m => m.DashboardModule)},
    {path: 'products', loadChildren: () => import('./products/products.module').then ( m => m.ProductsModule)},
    {path: 'my-cart', loadChildren: () => import('./my-cart/my-cart.module').then ( m => m.MyCartModule)},
    {path: '**', redirectTo: 'dashboard'}
  ]}
];

@NgModule({
  declarations: [AdminComponent, CartPanelComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class AdminModule { }
