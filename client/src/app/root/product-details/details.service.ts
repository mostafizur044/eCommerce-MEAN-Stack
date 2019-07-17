import { Injectable } from '@angular/core';
import { HttpService } from '../../shared/service/http.service';
import { catchError, map } from 'rxjs/operators';
import { of } from 'rxjs';


@Injectable()
export class ProductDetailsService {

  constructor(
    private http: HttpService
  ) { }

  getProducts(id) {
    return this.http.get('products/' + id).pipe( map ((res: any) => res.data), catchError (err => of(null)));
  }

  
}
