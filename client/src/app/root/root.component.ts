import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, NavigationStart } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './root.component.html',
  styleUrls: ['./root.component.scss']
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
          window.scrollTo(0,0);
        }

        if(event instanceof NavigationEnd) {
          this.routeLoading = false;
        }
      }
    );
    
  }

}
