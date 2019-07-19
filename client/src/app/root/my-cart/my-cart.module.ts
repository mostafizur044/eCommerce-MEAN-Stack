import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyCartComponent } from './my-cart.component';
import { Routes, RouterModule } from '@angular/router';
import { CardModule } from '../../shared/modules/card/card.module';


const routes: Routes = [
  {path: '', component: MyCartComponent},
];

@NgModule({
  declarations: [MyCartComponent],
  imports: [
    CommonModule,
    CardModule,
    RouterModule.forChild(routes)
  ]
})
export class MyCartModule { }
