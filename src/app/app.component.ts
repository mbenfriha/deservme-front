import {Component, ElementRef, OnChanges, OnInit, SimpleChange, PLATFORM_ID, Inject, OnDestroy} from '@angular/core';
import {ActivatedRoute, ActivatedRouteSnapshot, NavigationEnd, Router} from '@angular/router';
import { MetafrenzyService } from 'ngx-metafrenzy';
import {AuthenticationService} from './core/authentication/authentication.service';
import {User} from './models/user';
import {ToastrService} from 'ngx-toastr';
import  { LoaderService } from "./core/service/loader.service";


import { NgcInitializeEvent , NgcStatusChangeEvent, NgcCookieConsentService } from 'ngx-cookieconsent';


import { DOCUMENT } from '@angular/common';
import {isNullOrUndefined} from "util";
import {Subscription} from "rxjs";
import {TranslateService} from "@ngx-translate/core";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
    title = 'MyQuizzy';
    home = true;
    currentRoute = '';
    user: User;
    loaded = null;

    private popupOpenSubscription: Subscription;
    private popupCloseSubscription: Subscription;
    private initializeSubscription: Subscription;
    private statusChangeSubscription: Subscription;
    private revokeChoiceSubscription: Subscription;
    private noCookieLawSubscription: Subscription;

    constructor(
        private router: Router,
        private readonly metafrenzyService: MetafrenzyService,
        private authenticationService: AuthenticationService,
        private loaderService: LoaderService,
        private route: ActivatedRoute,
        private toastr: ToastrService,
        @Inject(DOCUMENT) private document: Document,
        @Inject(PLATFORM_ID) private platformId: any,
        private ccService: NgcCookieConsentService,
        private readonly translateService: TranslateService) {


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
        this.translateService.setDefaultLang('en');
        this.translateService.use(this.translateService.getBrowserLang());

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

        // subscribe to cookieconsent observables to react to main events
        this.popupOpenSubscription = this.ccService.popupOpen$.subscribe(
            () => {
                // you can use this.ccService.getConfig() to do stuff...
            });

        this.popupCloseSubscription = this.ccService.popupClose$.subscribe(
            () => {
                // you can use this.ccService.getConfig() to do stuff...
            });

        this.initializeSubscription = this.ccService.initialize$.subscribe(
            (event: NgcInitializeEvent) => {
                // you can use this.ccService.getConfig() to do stuff...
            });

        this.statusChangeSubscription = this.ccService.statusChange$.subscribe(
            (event: NgcStatusChangeEvent) => {
                // you can use this.ccService.getConfig() to do stuff...
            });

        this.revokeChoiceSubscription = this.ccService.revokeChoice$.subscribe(
            () => {
                // you can use this.ccService.getConfig() to do stuff...
            });

        this.translateService//
            .get(['cookie.header', 'cookie.message', 'cookie.dismiss', 'cookie.allow', 'cookie.deny', 'cookie.link', 'cookie.policy'])
            .subscribe(data => {

                this.ccService.getConfig().content = this.ccService.getConfig().content || {} ;
                // Override default messages with the translated ones
                this.ccService.getConfig().content.header = data['cookie.header'];
                this.ccService.getConfig().content.message = data['cookie.message'];
                this.ccService.getConfig().content.dismiss = data['cookie.dismiss'];
                this.ccService.getConfig().content.allow = data['cookie.allow'];
                this.ccService.getConfig().content.deny = data['cookie.deny'];
                this.ccService.getConfig().content.link = data['cookie.link'];
                this.ccService.getConfig().content.policy = data['cookie.policy'];

                this.ccService.destroy();//remove previous cookie bar (with default messages)
                this.ccService.init(this.ccService.getConfig()); // update config with translated messages
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

    ngOnDestroy() {
        // unsubscribe to cookieconsent observables to prevent memory leaks
        this.popupOpenSubscription.unsubscribe();
        this.popupCloseSubscription.unsubscribe();
        this.initializeSubscription.unsubscribe();
        this.statusChangeSubscription.unsubscribe();
        this.revokeChoiceSubscription.unsubscribe();
        this.noCookieLawSubscription.unsubscribe();
    }
}
