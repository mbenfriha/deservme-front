import {Component, ElementRef, OnChanges, OnInit, SimpleChange} from '@angular/core';
import {ActivatedRoute, ActivatedRouteSnapshot, NavigationEnd, Router} from '@angular/router';
import { MetafrenzyService } from 'ngx-metafrenzy';
import {AuthenticationService} from './services/authentication.service';
import {User} from './models/user';
import {StorageMap} from '@ngx-pwa/local-storage';
import {ToastrService} from 'ngx-toastr';
import { first } from 'rxjs/operators';


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


    constructor(
        private router: Router,
        private readonly metafrenzyService: MetafrenzyService,
        private authenticationService: AuthenticationService,
        private route: ActivatedRoute,
        private storage: StorageMap,
        private toastr: ToastrService,) {

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
        //get if is home
        this.router.events.subscribe((event) => {
            if (event instanceof NavigationEnd) {
                if (!this.getDeepestTitle(this.router.routerState.snapshot.root) ||
                    this.getDeepestTitle(this.router.routerState.snapshot.root) == 'register') {
                    this.home = true;
                    this.currentRoute = '';
                } else {
                    this.currentRoute = this.getDeepestTitle(this.router.routerState.snapshot.root)

                    this.home = false;
                }
            }
        });

        //check login
        this.route.queryParams.subscribe(params => {
            if (params['id']) {
                console.log("j'ai un param id")
                this.authenticationService.login()
                    .subscribe(
                        (user: User) => {
                            console.log('un user')
                            if(!user.username) {
                                this.router.navigate(['/register']);
                            } else {
                                if(this.home) {
                                    this.router.navigate(['/discover'])
                                }
                            }
                        },
                        error => {
                            this.router.navigate(['/'], {queryParams: {banned: true}});
                        });
            }
            if (params['banned']) {
                this.toastr.error('Vous avez été bannis ');
            }
        });

        if(this.user && !this.user.username) {
            console.log('go register');
            this.router.navigate(['/register']);
        }
        
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
