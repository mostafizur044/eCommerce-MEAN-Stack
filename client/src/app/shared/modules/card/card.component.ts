import { Component, OnInit, Input } from '@angular/core';
import { Product } from '../../model/data';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  @Input('product') product: Product; 

  constructor() { }

  ngOnInit() {
  }

  cartQtyChange(type, product) {

  }

}
