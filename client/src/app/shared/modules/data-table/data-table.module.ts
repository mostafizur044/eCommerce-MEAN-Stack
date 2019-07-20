import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataTableComponent } from './data-table.component';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatTableModule} from '@angular/material/table';
import {MatSortModule} from '@angular/material/sort';

@NgModule({
  declarations: [DataTableComponent],
  imports: [
    CommonModule,
    MatPaginatorModule,
    MatTableModule,
    MatSortModule
  ],
  exports: [DataTableComponent]
})
export class DataTableModule { }
