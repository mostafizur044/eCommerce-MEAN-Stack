import { Component, OnInit } from '@angular/core';
import { DashboardService } from './dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  config = {
    page: 0,
    totalCount: 0,
    products: []
  };
  filter: string;
  loading: boolean = false;

  constructor(
    private service: DashboardService
  ) { 
    this.getProducts();
  }

  ngOnInit() {
  }

  private getProducts() {
    this.loading = true;
    this.service.getProducts(this.config, this.filter || '').subscribe(
      res => {
        this.loading = false;
        this.config = {...this.config, ...res};
      } 
    );
  }

}
