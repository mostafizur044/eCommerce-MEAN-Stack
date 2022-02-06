import { Component, OnInit, HostBinding } from '@angular/core';
import { Router, NavigationEnd, NavigationStart } from '@angular/router';
import { OverlayContainer } from '@angular/cdk/overlay';
import { ANGULAR_MATERIAL_THEMES, CUSTOM_THEME } from '../shared/constants/constants';


@Component({
  selector: 'app-root',
  templateUrl: './root.component.html',
  styleUrls: ['./root.component.scss']
})
export class RootComponent implements OnInit {

  themes = CUSTOM_THEME;
  materialThemes = ANGULAR_MATERIAL_THEMES;
  routeLoading: boolean;


  @HostBinding('class') componentCssClass;

  constructor(
    public overlayContainer: OverlayContainer,
    private router: Router
  ) { 
    this.changeTheme(this.themes[0]);
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

  changeTheme(theme) {
    for(let v of theme.values) {
      document.documentElement.style.setProperty(v.name, v.value);
    }
  }

  onSetTheme(theme) {
    this.overlayContainer.getContainerElement().classList.add(theme);
    this.componentCssClass = theme;
  }

}
