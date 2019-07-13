import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateComponent } from './create/create.component';
import { ListComponent } from './list/list.component';
import { Routes, RouterModule } from '@angular/router';
import { DataTableModule } from '../../shared/modules/data-table/data-table.module';
import { ProductService } from './service/product.service';



const routes: Routes = [
  {path: '', component: ListComponent},
  {path: 'create', component: CreateComponent},
  {path: 'edit/:uid', component: CreateComponent}
];

@NgModule({
  declarations: [CreateComponent, ListComponent],
  imports: [
    CommonModule,
    DataTableModule,
    RouterModule.forChild(routes)
  ],
  providers: [ProductService]
})
export class ProductsModule { }
