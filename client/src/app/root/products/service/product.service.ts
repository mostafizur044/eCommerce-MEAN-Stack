import { Injectable } from "@angular/core";
import { HttpService } from "../../../shared/service/http.service";
import { of } from "rxjs";
import { map, catchError } from "rxjs/operators";
import {cloneDeep} from 'loadsh';

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

  getSingleProduct (id) {
    return this.http.get(`products/${id}`).pipe(
      map ( (res: any) => res.data)
    );
  }

  getDictionary() {
    return this.http.get('dictionary').pipe(
      map((res: any) => this.formatDictionary(res.data) ),
      catchError( err => of({origin: [], category: []}))
    );
  }

  private formatDictionary(data) {
    let dic = {origin: [], category: []};
    data.forEach(element => {
      if(element.Type === 'Origin') {
        dic.origin.push(element);
      } else {
        dic.category.push(element);
      }
    });
    return dic;
  }

  saveProduct(id, data) {
    if(id) {
      return this.http.post('products/' + id, data).toPromise();
    }
    return this.http.post('products/create', data).toPromise();
  }

  deleteProduct(id) {
    return this.http.delete('products/' + id).toPromise();
  }

  formateProduct(data, cartList) {
    const products = cloneDeep(data);
    return products.map( m => {
      const cart = cartList.find( c => c._id === m._id);
      if(cart) m['disable'] = true;
      return m;
    });
  }
}
