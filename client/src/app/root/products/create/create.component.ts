import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ProductService } from '../service/product.service';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Product } from '../../../shared/model/data';
import { CommonService } from '../../../shared/service/common.service';
import { CartService } from '../../../shared/service/cart.service';


@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit, OnDestroy {

  subscription: Subscription[] = [];
  productId: string;
  productForm: FormGroup;
  categories = [];
  origins = [];
  loading: boolean;
  title: string = 'Create';
  productShotCode: string;
  addAnother: FormControl;

  constructor(
    private activeRoute: ActivatedRoute,
    private service: ProductService,
    private fb: FormBuilder,
    private router: Router,
    private commonService: CommonService,
    private cartService: CartService
  ) {
    this.getDictionary();
  }

  ngOnInit() {
    this.subscription.push (
      this.activeRoute.paramMap.subscribe(
        value => {
          this.productId = value.get('uid');
          if(this.productId) {
            this.loading = true;
            this.title = 'Update'
            this.getProduct()
          } else {
            this.addAnother = new FormControl();
            this.initForm(new Product());
          }
        }
      )
    );
  }

  ngOnDestroy() {
    this.subscription.forEach( f => f.unsubscribe());
  }

  private initForm(data) {
    this.productForm = this.fb.group({
      ProductName: [data.ProductName, [Validators.required, Validators.maxLength(50), Validators.minLength(3)]],
      ProductShotCode: [''],
      Category: [(this.productId ? data.Category._id : null), Validators.required],
      Price: [data.Price, [Validators.required, Validators.min(0)]],
      Quantity: [data.Quantity, [Validators.required, Validators.min(0)]],
      Description: [data.Description, Validators.maxLength(250)],
      IsBestAchived: [data.IsBestAchived],
      Origin: [(this.productId ? data.Origin._id : null), Validators.required],
      ImageLink: [data.ImageLink]
    });
    this.productShotCode = data.ProductShotCode;
    this.productForm.valueChanges.subscribe(val => {
      const origin = this.origins.find( f => f._id === val.Origin);
      const originCode = origin ? origin.ShortCode : '';
      const cate = this.categories.find( f => f._id === val.Category);
      const cateCode = cate ? cate.ShortCode : '';
      const proName = val.ProductName ? val.ProductName.split(' ') : [];
      const shodeCode = proName.join('-').toLowerCase();
      this.productShotCode = [originCode, cateCode, shodeCode].join('-') ;
    });
  }

  private getProduct () {
    this.service.getSingleProduct(this.productId).subscribe(
      res => {
        this.initForm(res);
        this.loading = false;
      }
    );
  }

  private getDictionary() {
    this.service.getDictionary().subscribe(
      res => {
        this.origins = res.origin;
        this.categories = res.category;
      }
    );
  }

  productSubmit(productForm: FormGroup) {
    productForm.value['ProductShotCode'] = this.productShotCode;
    productForm.value['ImageLink'] = productForm.value['ImageLink'] ? productForm.value['ImageLink'] : 'http://www.independentmediators.co.uk/wp-content/uploads/2016/02/placeholder-image.jpg';
    this.service.saveProduct(this.productId, productForm.value).then(
      (res: any) => {
        if(this.productId) {
          this.commonService.openSnackBar(res.message);
          this.updateCart(productForm.value);
        } else {
          if(this.addAnother.value) this.initForm(new Product())
          else this.router.navigate(['/products']);
        }
      }
    ).catch(
      err => {
        this.commonService.openSnackBar(err.error ? err.error.message : err.message);
      }
    );
  }

  private updateCart(data) {
    const pro = this.cartService.cartItmesValue.find( f => f._id === this.productId);
    if(pro) {
      const newPro = {...pro, ...data};
      if(newPro['cartQty'] >  newPro.Quantity) {
        newPro['cartQty'] = newPro.Quantity;
        this.cartService.updateProductQtyToCart({ProductId: this.productId, Quantity: newPro['cartQty']});
      } 
      newPro.Quantity = newPro.Quantity - newPro['cartQty'];
      this.cartService.cartItemChange.emit(newPro);
    }
  }

}
