import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import {AuthenticationService} from '../authentication.service';
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import {isNullOrUndefined} from "util";


@Injectable()
export class UsernameGuard implements CanActivate {
    constructor(
        private router: Router,
        private authenticationService: AuthenticationService
    ) { }


    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> {
        return this.authenticationService.currentUser.pipe(
            map(user => {
                if(!isNullOrUndefined(user) && isNullOrUndefined(user.username)) {
                    console.log('ok');
                    // logged in so return true
                    this.router.navigate(['/profile/init']);
                    return false;
                } else {
                    console.log('ko');
                    return true;
                }
            })
        );
    }
}