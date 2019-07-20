
export class TableConfig {
    column: string = '';
    title: string = '';
    template?: any;
    sort: boolean;
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
