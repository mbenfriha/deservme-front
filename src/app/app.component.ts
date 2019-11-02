import {Component, ElementRef, OnInit} from '@angular/core';
import {ActivatedRoute, ActivatedRouteSnapshot, NavigationEnd, Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'deserveme';
  home = true;
  currentRoute = '';

  constructor(
    private route: Router) {
  }
  ngOnInit() {
    this.route.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        if (!this.getDeepestTitle(this.route.routerState.snapshot.root)) {
          this.home = true;
          this.currentRoute = '';
            console.log('home');
        } else {
          this.currentRoute = this.getDeepestTitle(this.route.routerState.snapshot.root)

          this.home = false;
          console.log(this.currentRoute);
        }
      }
    });
  }

  getDeepestTitle(routeSnapshot: ActivatedRouteSnapshot) {
      console.log(routeSnapshot);
    if (routeSnapshot.routeConfig && routeSnapshot.routeConfig.path) {
      return routeSnapshot.routeConfig.path;
    }
    let title = routeSnapshot.data ? routeSnapshot.data['title'] : '';
    if (routeSnapshot.firstChild) {
      title = this.getDeepestTitle(routeSnapshot.firstChild) || title;
    }
    return title;
  }
}
