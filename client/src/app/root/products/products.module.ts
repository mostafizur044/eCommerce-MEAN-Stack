import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateComponent } from './create/create.component';
import { ListComponent } from './list/list.component';
import { Routes, RouterModule } from '@angular/router';
import { DataTableModule } from '../../shared/modules/data-table/data-table.module';
import { ProductService } from './service/product.service';
import { FlexLayoutModule } from '@angular/flex-layout';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatDialogModule} from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatRadioModule} from '@angular/material/radio';
import {MatCheckboxModule} from '@angular/material/checkbox';


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
    FlexLayoutModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatRadioModule,
    MatSelectModule,
    MatFormFieldModule,
    MatProgressBarModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    RouterModule.forChild(routes)
  ],
  providers: [ProductService]
})
export class ProductsModule { }
