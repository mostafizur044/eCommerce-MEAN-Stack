import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { DataTableConfig, Pagination } from '../../../shared/modules/data-table/dataTable.model';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  dataSource = [
    {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
    {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
    {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
    {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
    {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
    {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
    {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
    {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
    {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
    {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
  ];

  dataTableConfig: DataTableConfig = {
    pagination: {
      totalItem: 10,
      page: 0,
      pageSize: 10
    },
    tableConfig: []
  };

  @ViewChild('name', {static: true}) name: TemplateRef<any>;
  @ViewChild('symbol', {static: true}) symbol: TemplateRef<any>;


  constructor() { }

  ngOnInit() {
    this.dataTableConfig.tableConfig = [
      {column: 'position', title: 'No.'},
      {column: 'name', title: 'Name', template: this.name},
      {column: 'weight', title: 'Weight'},
      {column: 'symbol', title: 'Symbol', template: this.symbol}
    ];
  }

}
