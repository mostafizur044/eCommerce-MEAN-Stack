import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(
    private http: HttpService
  ) { }

  getCartList(id) {
    return this.http.get('/cart' + id).pipe( map ( (res: any) => res.data), catchError( err => of([])));
  }

  createCart(data) {
    return this.http.post('cart', data).toPromise();
  }

  addNewProductToCart(id, data) {
      return this.http.post('cart/' + id, data).toPromise();
  }

  updateProductQtyToCart(id, data) {
    return this.http.post('cart/update-item-qty/' + id, data).toPromise();
  }

  removeProductFromCart(id, data) {
    return this.http.post('cart/delete-item/' + id, data).toPromise();
  }

  removeCart(id, data) {
    return this.http.delete('cart/' + id, data).toPromise();
  }

}
