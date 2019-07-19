import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, NavigationStart } from '@angular/router';


@Component({
  selector: 'app-Root',
  templateUrl: './Root.component.html',
  styleUrls: ['./Root.component.scss']
})
export class RootComponent implements OnInit {

  routeLoading: boolean;

  constructor(
    private router: Router
  ) { 
    
  }

  ngOnInit() {
    this.router.events.subscribe(
      event => {
        if(event instanceof NavigationStart) {
          this.routeLoading = true;
        }

        if(event instanceof NavigationEnd) {
          this.routeLoading = false;
        }
      }
    );
    
  }

}
