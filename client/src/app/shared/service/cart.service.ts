import { Injectable, EventEmitter } from '@angular/core';
import { HttpService } from './http.service';
import { map, catchError } from 'rxjs/operators';
import { of, BehaviorSubject } from 'rxjs';
import { CommonService } from './common.service';


@Injectable({
  providedIn: 'root'
})
export class CartService {

  cartItmesValue = [];
  cartItems: BehaviorSubject<any> = new BehaviorSubject(null);
  cartItemChange: EventEmitter<any> = new EventEmitter();

  constructor(
    private http: HttpService,
    private commonService: CommonService
  ) {
    this.cartItems.subscribe(val => {
      this.cartItmesValue = val || this.cartItmesValue;
    })
   }

  getCartList() {
    return this.http.get('cart/' + this.cartId).pipe( map ( (res: any) => res.data), catchError( err => of([])));
  }

  createCart(data) {
    return this.http.post('cart', data).toPromise();
  }

  addNewProductToCart(data) {
      return this.http.post('cart/' + this.cartId, data).toPromise();
  }

  updateProductQtyToCart(data) {
    return this.http.post('cart/update-item-qty/' + this.cartId, data).toPromise();
  }

  removeProductFromCart(data) {
    return this.http.post('cart/delete-item/' + this.cartId, data).toPromise();
  }

  removeCart(data) {
    return this.http.delete('cart/' + this.cartId, data).toPromise();
  }

  get cartId() {
    return localStorage.getItem('cartId');
  }

  addToCart(product) { 
    if(this.cartId) {
      const sendData = {
        "ProductId": product._id,
        "Quantity": product.cartQty + 1
      };
      return this.addNewProductToCart(sendData).then(
        (res: any) => {
          this.commonService.openSnackBar(res.message);
          return this.addCartResponse(product, 'cartQty', 'Quantity');
        }
      ).catch(
        err => {
          this.commonService.openSnackBar(err.error ? err.error.message : err.message);
          return this.promise(false);
        }
      );
    } else {
      const sendData = {
        "ProductIds": [
          {
            "ProductId": product._id,
            "Quantity": 1
          }
        ]
      };
      return this.createCart(sendData).then(
        (res: any) => {
          localStorage.setItem('cartId', res.data._id);
          this.commonService.openSnackBar(res.message);
          return this.promise(false);
        }
      ).catch(
        err => {
          this.commonService.openSnackBar(err.error ? err.error.message : err.message);
          return this.promise(false);
        }
      );
    }

  }

  private addCartResponse( product, incProp, decProp) {
    product[incProp] += 1;
    product[decProp] -= 1;
    this.cartItemChange.emit(product);
    return this.promise(false);
  }

  private promise (data) {
    return new Promise((resolve, reject) => {
      return resolve(data);
    });
  }

  cartQtyUpdate(product, prop) {
    const sendData = {
      "ProductId": product._id,
      "Quantity": (prop === 'cartQty' ? product['cartQty'] + 1 : product['cartQty'] -1)
    };
    if(sendData.Quantity > 0) {
      return this.updateProductQtyToCart(sendData).then(
        (res: any) => {
          // console.log(res);
          this.commonService.openSnackBar(res.message);
          const dec = prop === 'cartQty' ? 'Quantity' : 'cartQty';
          return this.addCartResponse(product, prop, dec);
        }
      ).catch(
        err => {
          this.commonService.openSnackBar(err.error ? err.error.message : err.message);
          return this.promise(false);
        }
      );
    } else {
      return this.removeCartItem(product);
    }
    
  }

  removeCartItem(product) {
    const data = {
      "ProductId": product._id
    };
    return this.removeProductFromCart(data).then(
      (res: any) => {
        this.commonService.openSnackBar(res.message);
        this.cartItmesValue = this.cartItmesValue.filter( f => f._id !== data.ProductId);
        this.cartItems.next(this.cartItmesValue);
        return this.promise(false);
      }
    ).catch(
      err => {
        this.commonService.openSnackBar(err.error ? err.error.message : err.message);
        return this.promise(false);
      }
    );
  }

}
