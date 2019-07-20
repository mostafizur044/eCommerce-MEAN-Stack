import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Product } from '../../model/data';
import { CartService } from '../../service/cart.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit, OnDestroy {

  @Input('product') product: Product; 
  @Input('cartComponent') cartComponent: boolean;

  cartItems = [];
  subs: Subscription[] = []; 
  loading: boolean = false;

  constructor(
    private cartService: CartService
  ) {}

  ngOnInit() {
    // console.log(this.product)
   }

  ngOnDestroy(){
    this.subs.forEach( f => f.unsubscribe());
  }

  cartQtyChange(type, product) {
    this.loading = true;
    const prop = type === 'inc' ? 'cartQty' : 'Quantity';
    this.cartService.cartQtyUpdate(product, prop).then(
      res => this.loading = false
    ).catch(
      err => this.loading = false
    );
  }

  addToCart(product) {
    this.loading = true;
    if(product.Quantity > 0) {
      this.cartService.addToCart(product).then(
        res => this.loading = false
      ).catch(
        err => this.loading = false
      );
    }
  }

  get decCheck() {
    if(this.cartComponent) return this.product['cartQty'] > 1;
    return this.product['cartQty'] > 0;
  }

  get incCheck() {
    return this.product['Quantity'] > 0;
  }

  removeCartItem(product) {
    this.loading = true;
    this.cartService.removeCartItem(product).then(
      res => this.loading = false
    ).catch(
      err => this.loading = false
    );
  }

}
