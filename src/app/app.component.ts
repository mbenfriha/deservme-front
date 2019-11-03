import {Component, ElementRef, OnChanges, OnInit, SimpleChange} from '@angular/core';
import {ActivatedRoute, ActivatedRouteSnapshot, NavigationEnd, Router} from '@angular/router';
import { MetafrenzyService } from 'ngx-metafrenzy';

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
    private route: Router,
    private readonly metafrenzyService: MetafrenzyService) {

      this.metafrenzyService.setOpenGraph({
          title: 'Deserv.me - Réponde aux quizz',
          description: 'Crée, participe et partage des quizz',
          type: 'website',
          url: 'https://deserv.me',
          image: 'https://deserv.me/assets/images/color-logo.png',
          site_name: 'Deserv.me'
      });
      this.metafrenzyService.setMetaTag('fb:app_id', '396653554338782');
      this.metafrenzyService.setLinkTag({
          rel: 'canonical',
          href: 'https://deserv.me'
      });
  }
  ngOnInit() {
    this.route.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        if (!this.getDeepestTitle(this.route.routerState.snapshot.root) ||
            this.getDeepestTitle(this.route.routerState.snapshot.root) == 'register') {
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
