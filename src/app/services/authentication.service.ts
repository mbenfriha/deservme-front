import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import {environment} from 'src/environments/environment';
import {User} from '../models/user';
import {StorageMap} from '@ngx-pwa/local-storage';


@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;

    constructor(private http: HttpClient,
                private storage: StorageMap) {

                this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('user')));
                this.currentUser = this.currentUserSubject.asObservable();

    }

    public get currentUserValue(): User {
       if(this.currentUserSubject) {
           return this.currentUserSubject.value;

       }
    }

    
    login() {
        return this.http.get<any>(`${environment.baseUrl}user`, { withCredentials: true })
            .pipe(map(user => {
                console.log('caca');
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('user', JSON.stringify(user));
                this.currentUserSubject.next(user);
                return user;
            }));
    }

    logout() {
        // remove user from local storage to log user out
        //this.storage.delete('user').subscribe(() => {});
        localStorage.removeItem('user');

        this.currentUserSubject.next(null);
    }
}