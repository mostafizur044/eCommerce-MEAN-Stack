import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductDetailsComponent } from './product-details.component';
import { Routes, RouterModule } from '@angular/router';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { ProductDetailsService } from './details.service';
import {MatChipsModule} from '@angular/material/chips';

const routes: Routes = [
  {path: '', component: ProductDetailsComponent}
];


@NgModule({
  declarations: [ProductDetailsComponent],
  imports: [
    CommonModule,
    MatProgressBarModule,
    RouterModule.forChild(routes),
    MatChipsModule
  ],
  providers: [ProductDetailsService]
})
export class ProductDetailsModule { }
