import {Component, ElementRef, OnChanges, OnInit, SimpleChange,PLATFORM_ID, Inject } from '@angular/core';
import {ActivatedRoute, ActivatedRouteSnapshot, NavigationEnd, Router} from '@angular/router';
import { MetafrenzyService } from 'ngx-metafrenzy';
import {AuthenticationService} from './core/authentication/authentication.service';
import {User} from './models/user';
import {ToastrService} from 'ngx-toastr';
import  { LoaderService } from "./core/service/loader.service";

import { DOCUMENT } from '@angular/common';
import {isNullOrUndefined} from "util";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    title = 'MyQuizzy';
    home = true;
    currentRoute = '';
    user: User;
    loaded = null;

    constructor(
        private router: Router,
        private readonly metafrenzyService: MetafrenzyService,
        private authenticationService: AuthenticationService,
        private loaderService: LoaderService,
        private route: ActivatedRoute,
        private toastr: ToastrService,
        @Inject(DOCUMENT) private document: Document,
        @Inject(PLATFORM_ID) private platformId: any) {


        this.metafrenzyService.setOpenGraph({
            type: 'website',
            url: 'https://myquizzy.com',
            image: 'https://myquizzy.com/assets/images/logomyquizzy.png',
            site_name: 'MyQuizzy'
        });
        this.metafrenzyService.setMetaTag('fb:app_id', '396653554338782');
        this.metafrenzyService.setLinkTag({
            rel: 'canonical',
            href: 'https://myquizzy.com'
        });
        this.authenticationService.currentUser.subscribe(x => this.user = x);

    }
    ngOnInit() {

        this.loaderService.load.subscribe((l) => this.loaded = isNullOrUndefined(l) || l);
        //get if is home
        this.router.events.subscribe((event) => {
            if (event instanceof NavigationEnd) {
                if (!this.getDeepestTitle(this.router.routerState.snapshot.root) ||
                    this.getDeepestTitle(this.router.routerState.snapshot.root) == 'register') {
                    this.home = true;
                    this.currentRoute = '';
                } else {
                    this.currentRoute = this.getDeepestTitle(this.router.routerState.snapshot.root);
                    this.home = false;
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
