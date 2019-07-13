import { Injectable } from "@angular/core";
import { HttpService } from "../../../shared/service/http.service";
import { of } from "rxjs";
import { map, catchError } from "rxjs/operators";

@Injectable()
export class ProductService {
  constructor(private http: HttpService) {}

  getProducts(config, filter) {
    const sendData = {
      page: config.page,
      limit: config.pageSize,
      filter,
      sortKey: config.sortKey || "_id",
      sortOrder: config.sortOrder || 1
    };
    return this.http.post("products", sendData).pipe(
      map((res: any) => res.data),
      catchError(e =>
        of({
          // limit: config.pageSize,
          // page: config.page,
          totalCount: config.totalItem,
          products: config.dataSource
        })
      )
    );
  }
}
