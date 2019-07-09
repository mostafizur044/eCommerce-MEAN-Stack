import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyCartComponent } from './my-cart.component';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {path: '', component: MyCartComponent},
];

@NgModule({
  declarations: [MyCartComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class MyCartModule { }
