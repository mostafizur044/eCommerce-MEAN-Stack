import {
  Component,
  OnInit,
  ViewChild,
  Input,
  Output,
  EventEmitter
} from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { DataTableConfig, Pagination } from "./dataTable.model";
import { Sort } from "@angular/material/sort";

@Component({
  selector: "app-data-table",
  templateUrl: "./data-table.component.html",
  styleUrls: ["./data-table.component.scss"]
})
export class DataTableComponent implements OnInit {

  displayedColumns: string[] = [];

  @Input("config") config: DataTableConfig;
  @Input("dataSource") dataSource = [];
  @Output("pageEvent") pageChange: EventEmitter<any> = new EventEmitter();

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor() {}

  ngOnInit() {
    if (!this.config) this.config = new DataTableConfig();
    if (this.config && !this.config.pagination)
      this.config.pagination = new Pagination();
    this.config.pagination.pageSizeOptions = this.config.pagination
      .pageSizeOptions
      ? this.config.pagination.pageSizeOptions
      : [10, 25, 50, 100];
    if (this.config && !this.config.tableConfig) this.config.tableConfig = [];
    if (!this.dataSource) this.dataSource = [];
    this.displayedColumns = this.config.tableConfig.map(m => m.column);
    console.log(this.config, this.dataSource)
  }

  pageEvent(event) {
    console.log(event);
  }

  sortData(event: Sort) {
    console.log(event);
  }
}
