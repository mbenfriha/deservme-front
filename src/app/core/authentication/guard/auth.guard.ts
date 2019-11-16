import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import {AuthenticationService} from '../authentication.service';
import {isNullOrUndefined} from "util";
import {Observable} from "rxjs";
import {catchError, map} from "rxjs/operators";


@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private authenticationService: AuthenticationService
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> {

        return this.authenticationService.currentUser.pipe(
            map(user => {
                if(!isNullOrUndefined(user)) {
                    // logged in so return true
                    console.log("c'est ok");
                    return true;
                } else {
                    this.router.navigate(['/']);
                    return false;
                }
            })
        );
    }
}