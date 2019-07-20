import { Injectable } from '@angular/core';
import { HttpService } from '../../shared/service/http.service';
import { map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import {cloneDeep} from 'loadsh';

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
      sortKey: 'createdAt',
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

  formateProduct(data, cartList) {
    const products = cloneDeep(data);
    return products.map( m => {
      const cart = cartList.find( c => c._id === m._id);
      if(cart) m = {...m, ...cart};
      m['cartQty'] = m['cartQty'] || 0;
      return m;
    });
  }

  
}
