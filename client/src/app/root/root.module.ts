import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RootComponent } from './root.component';
import { Routes, RouterModule } from '@angular/router';
import { CartPanelComponent } from './cart-panel/cart-panel.component';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatMenuModule} from '@angular/material/menu';
import { OverlayModule } from '@angular/cdk/overlay';
import { MatButtonModule } from '@angular/material/button';


const routes: Routes = [
  {path: '', component: RootComponent, children: [
    {path: 'dashboard', loadChildren: () => import('./dashboard/dashboard.module').then( m => m.DashboardModule)},
    {path: 'products', loadChildren: () => import('./products/products.module').then ( m => m.ProductsModule)},
    {path: 'product/:id', loadChildren: () => import('./product-details/product-details.module').then ( m => m.ProductDetailsModule)},
    {path: 'my-cart', loadChildren: () => import('./my-cart/my-cart.module').then ( m => m.MyCartModule)},
    {path: '**', redirectTo: 'dashboard'}
  ]}
];

@NgModule({
  declarations: [RootComponent, CartPanelComponent],
  imports: [
    CommonModule,
    MatProgressBarModule,
    RouterModule.forChild(routes),
    MatMenuModule,
    OverlayModule,
    MatButtonModule
  ]
})
export class RootModule { }
