import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import {environment} from 'src/environments/environment';
import {User} from '../../models/user';
import {CookieService} from "ngx-cookie";
import { JwtHelperService } from "@auth0/angular-jwt";
import {isNull, isNullOrUndefined} from "util";


@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private currentUserSubject: BehaviorSubject<User> = new BehaviorSubject<User>(null);
 //   public currentUser: Observable<User>;
    private helper = new JwtHelperService();

    constructor(private http: HttpClient, private _cookieService:CookieService) {
                if(!isNullOrUndefined(this._cookieService.get('jwt'))){
                    const decodedToken = this.helper.decodeToken(this._cookieService.get('jwt'));
                    var user = decodedToken.data;
                    user.token = this._cookieService.get('jwt');
                    localStorage.setItem('user', JSON.stringify(user));
                    this._cookieService.remove('jwt');
                }
                if(!isNullOrUndefined(localStorage.getItem('user')))
                    this.currentUserSubject.next(JSON.parse(localStorage.getItem('user')))
    }

    public get currentUser(): Observable<User> {
           return this.currentUserSubject;
    }

    setUser(user) {
        localStorage.setItem('user', JSON.stringify(user));
        this.currentUserSubject.next(user);
    }

    login() {
        return this.http.get<any>(`${environment.baseUrl}user`, { withCredentials: true })
            .pipe(map(user => {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('token', JSON.stringify(user));
                this.currentUserSubject.next(user);
                return user;
            }));
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('user');

        this.currentUserSubject.next(null);
    }
}