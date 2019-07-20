import {
  Component,
  OnInit,
  ViewChild,
  Input,
  Output,
  EventEmitter
} from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { DataTableConfig } from "./dataTable.model";
import { Sort } from "@angular/material/sort";

@Component({
  selector: "app-data-table",
  templateUrl: "./data-table.component.html",
  styleUrls: ["./data-table.component.scss"]
})
export class DataTableComponent<T> implements OnInit {

  displayedColumns: string[] = [];

  @Input("config") config: DataTableConfig<T>;
  changeTableData: EventEmitter<DataTableConfig<T>> = new EventEmitter<DataTableConfig<T>>();
  @Output("dataTableEventChange") dataTableEventChange: EventEmitter<DataTableConfig<T>> = new EventEmitter();

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor() {}

  ngOnInit() {
    this.preparDataTable(this.config);
    this.changeTableData.subscribe((response: DataTableConfig<T>) => {
      console.log('Change table Data');
      this.preparDataTable(response);
    });
  }

  private preparDataTable (config: DataTableConfig<T>) {
    if (!config) config = new DataTableConfig();
    config.pageSizeOptions = config.pageSizeOptions
      ? config.pageSizeOptions
      : [10, 25, 50, 100];
    if (config && !config.tableConfig) config.tableConfig = [];
    if (config && !config.dataSource) config.dataSource = [];
    this.displayedColumns = config.tableConfig.map(m => m.column);
  }

  pageEvent(event) {
    this.config.page = event.pageIndex;
    this.config.pageSize = event.pageSize;
    this.dataTableEventChange.emit(this.config);
  }

  sortData(event: Sort) {
    this.config.sortKey = event.active;
    this.config.sortOrder = event.direction === 'asc' ? 1 : -1;
    this.dataTableEventChange.emit(this.config);
  }
}
