
export class TableConfig {
    column: string = '';
    title: string = '';
    template?: any;
  };
  
export class DataTableConfig<T> {
    tableConfig: TableConfig[] = [];
    dataSource: Array<T> = [];
    sortKey: string;
    sortOrder: number;
    totalItem: number = 0;
    pageSize: number = 10;
    page: number = 0;
    pageSizeOptions?: number[];
};
