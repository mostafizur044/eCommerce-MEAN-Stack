import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductDetailsService } from './details.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit, OnDestroy {

  subscription: Subscription[] = [];
  productId: string;
  loading: boolean;
  product;

  constructor(
    private service: ProductDetailsService,
    private activeRoute: ActivatedRoute
  ) {
    this.subscription.push(
      this.activeRoute.paramMap.subscribe(
        val => {
          this.productId = val.get('id');
          this.getProduct();
        } 
      )
    );
   }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.subscription.forEach( f => f.unsubscribe());
  }

  private getProduct() {
    this.loading = true;
    this.service.getProducts(this.productId).subscribe(
      res => {
        this.loading = false;
        if(res) {
          this.product = res;
        }
      }
    );
  }

}
