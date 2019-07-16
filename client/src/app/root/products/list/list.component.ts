import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { Product } from '../../../shared/model/data';
import { DataTableComponent } from '../../../shared/modules/data-table/data-table.component';
import { ProductService } from '../service/product.service';
import {MatDialog} from '@angular/material/dialog';
import { CommonService } from '../../../shared/service/common.service';


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  dataTableConfig = {
    tableConfig: [],
    totalItem: 0,
    pageSize: 10,
    page: 0,
    dataSource: [],
    sortKey: 'createdAt',
    sortOrder: 1
  };
  filter: string = '';
  loading: boolean = false;
  dialogRef;

  @ViewChild('Description', {static: true}) Description: TemplateRef<any>;
  @ViewChild('CreatedAt', {static: true}) CreatedAt: TemplateRef<any>;
  @ViewChild('Action', {static: true}) Action: TemplateRef<any>;
  @ViewChild('dataTableComponent', {static: true}) dataTableComponent: DataTableComponent<Product>;
  @ViewChild('dialogRef', {static: true}) dialogTemplateRef: TemplateRef<any>;

  constructor(
    private dialog: MatDialog,
    private service: ProductService,
    private commonService: CommonService
  ) { 
    this.getProducts(this.dataTableConfig);
  }

  ngOnInit() {
    this.dataTableConfig['tableConfig'] = [
      {column: 'ProductName', title: 'Name'},
      {column: 'ProductShotCode', title: 'Shot Code'},
      {column: 'Price', title: 'Price'},
      {column: 'Quantity', title: 'Quantity'},
      {column: 'createdAt', title: 'Created Date', template: this.CreatedAt},
      {column: 's', title: '', template: this.Action}
    ];

  }

  private getProducts(config) {
    this.loading = true;
    this.service.getProducts(config, this.filter).subscribe(
      res => {
        this.loading = false;
        this.dataTableConfig.dataSource = res.products;
        this.dataTableConfig.totalItem = res.totalCount;
        // console.log(this.dataTableConfig)
      }
    );
  }

  openDeleteModal(row) {
    this.dialogRef = this.dialog.open(this.dialogTemplateRef, {
      data: row
    });
  }

  deleteProduct(data) {
    this.service.deleteProduct(data._id).then(
      (res: any) => {
        this.getProducts(this.dataTableConfig);
        this.commonService.openSnackBar(res.message);
        this.dialogRef.close();
      }
    ).catch(
      err => {
        // console.log(err)
        this.commonService.openSnackBar(err.error ? err.error.message : err.message);
      }
    );
  }

}
