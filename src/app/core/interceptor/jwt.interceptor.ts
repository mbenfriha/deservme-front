import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

import {AuthenticationService} from '../authentication/authentication.service';
import {flatMap, map} from "rxjs/operators";

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(private authenticationService: AuthenticationService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add authorization header with jwt token if available
       return this.authenticationService.currentUser.pipe(flatMap( (user) => {
            if (user && user.token) {
                request = request.clone({
                    setHeaders: {
                        Authorization: `Bearer ${user.token}`
                    }
                });
            }
            return next.handle(request);
        } ));
    }
}