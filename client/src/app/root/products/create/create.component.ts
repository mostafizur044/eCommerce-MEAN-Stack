import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ProductService } from '../service/product.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Product } from '../../../shared/model/data';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit, OnDestroy {

  subscription: Subscription[] = [];
  productId: string;
  productForm: FormGroup;

  constructor(
    private activeRoute: ActivatedRoute,
    private service: ProductService,
    private fb: FormBuilder
  ) {
    this.subscription.push (
      this.activeRoute.paramMap.subscribe(
        val => {
          this.productId = val.get('uid');
          console.log(this.productId)
          if(this.productId) {
            this.getProduct()
          } else {
            this.initForm(new Product())
          }
        }
      )
    );
  }

  ngOnInit() {
    console.log();
  }

  ngOnDestroy() {
    this.subscription.forEach( f => f.unsubscribe());
  }

  private initForm(data) {
    this.productForm = this.fb.group({
      ProductName: [data.ProductName, [Validators.required, Validators.maxLength(50), Validators.minLength(3)]],
      ProductShotCode: [data.ProductShotCode, [Validators.required, Validators.maxLength(50), Validators.minLength(3)]],
      Category: [null, Validators.required],
      Price: [data.Price, [Validators.required, Validators.min(0)]],
      Quantity: [data.Quantity, [Validators.required, Validators.min(0)]],
      Description: [data.Description, Validators.maxLength(250)],
      IsBestAchived: [data.IsBestAchived],
      Origin: [null, Validators.required]
    });
  }

  private getProduct () {
    this.service.getSingleProduct(this.productId).subscribe(
      res => {
        this.initForm(res);
        console.log(res)
      }
    );
  }


}
