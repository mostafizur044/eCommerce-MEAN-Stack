import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { DashboardService } from './dashboard.service';
import { CartService } from '../../shared/service/cart.service';
import { Subscription } from 'rxjs';
import { Product } from '../../shared/model/data';
import { InfiniteScrollDirective } from 'ngx-infinite-scroll';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {

  config = {
    page: 0,
    totalCount: 0,
    products: []
  };
  filter: string;
  loading: boolean = false;
  subs: Subscription[] = [];
  products: Product[] = [];

  @ViewChild(InfiniteScrollDirective, {static: false}) infiniteScroll: InfiniteScrollDirective;

  constructor(
    private service: DashboardService,
    private cartService: CartService
  ) { 
    this.getProducts();
  }

  ngOnInit() {
    this.subs.push(
      this.cartService.cartItems.subscribe(
        val => {
          if(val) {
            this.products = this.service.formateProduct(this.config.products, val);
            // console.log(this.config.products)
          }
        }
      )
    );
  }

  ngOnDestroy() {
    this.subs.forEach( f => f.unsubscribe());
  }

  private getProducts() {
    this.loading = true;
    this.service.getProducts(this.config, this.filter || '').subscribe(
      res => {
        this.loading = false;
        this.config.totalCount = res.totalCount;
        this.config.products = [...this.config.products, ...res.products];
        this.products = this.service.formateProduct(this.config.products, this.cartService.cartItmesValue);
      },
      err => this.config.page -= 1
    );
  }

  onScroll() {
    // console.log(this.config.page)
    if ((this.config.page * 12) < this.config.totalCount) {
      this.config.page += 1; 
      this.getProducts();
    }

    // this.infiniteScroll.ngOnDestroy();
    // this.infiniteScroll.setup();
  }

}
