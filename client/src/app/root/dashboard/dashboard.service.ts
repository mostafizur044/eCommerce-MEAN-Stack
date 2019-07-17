import { Injectable } from '@angular/core';
import { HttpService } from '../../shared/service/http.service';
import { map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class DashboardService {

  constructor(
    private http: HttpService
  ) { }

  getProducts(config, filter) {
    const sendData = {
      page: config.page,
      limit: 12,
      filter,
      sortKey: 'ProductName',
      sortOrder: -1
    };
    return this.http.post("products", sendData).pipe(
      map((res: any) => res.data),
      catchError(e =>
        of({
          ...config
        })
      )
    );
  }

  
}
