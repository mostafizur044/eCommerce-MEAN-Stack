import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataTableComponent } from './data-table.component';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatTableModule} from '@angular/material/table';

@NgModule({
  declarations: [DataTableComponent],
  imports: [
    CommonModule,
    MatPaginatorModule,
    MatTableModule
  ],
  exports: [DataTableComponent]
})
export class DataTableModule { }
