
export class TableConfig {
    column: string = '';
    title: string = '';
    template?: any;
  };
  
export class DataTableConfig {
    pagination: Pagination = new Pagination();
    tableConfig: TableConfig[] = [];
};
  
export class Pagination {
    totalItem: number = 0;
    pageSize: number = 10;
    page: number = 0;
    pageSizeOptions?: number[];
};