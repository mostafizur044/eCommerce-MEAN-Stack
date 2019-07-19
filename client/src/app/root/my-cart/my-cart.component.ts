import { Component, OnInit } from '@angular/core';
import { CartService } from '../../shared/service/cart.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-my-cart',
  templateUrl: './my-cart.component.html',
  styleUrls: ['./my-cart.component.scss']
})
export class MyCartComponent implements OnInit {

  subs: Subscription[] = [];
  cartProduct = [];

  constructor(
    private cartService: CartService
  ) { }

  ngOnInit() {
    this.subs.push(
      this.cartService.cartItems.subscribe(
        val => {
          if(val) {
            this.cartProduct = val;
          }
        }
      )
    );
  }

  ngOnDestroy() {
    this.subs.forEach( f => f.unsubscribe());
  }
}
