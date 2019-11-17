import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {User} from "../../models/user";
import {Answer} from "../../models/answer";

@Injectable()
export class UserService {

    base_path = environment.baseUrl;
    constructor(private http: HttpClient) { }


    // Http Options
    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
        }),
    };

    // Get username
    getCurrentUsername(username): Observable<User> {
        return this.http
            .get<User>(this.base_path + 'username/' + username, { withCredentials: true })
    }

    // Update user
    updateUser(user): Observable<User> {
        return this.http
            .post<User>(this.base_path + 'update', JSON.stringify(user), this.httpOptions)
    }

    // Update avatar
    updateAvatar(file): Observable<any> {
        return this.http
            .post<any>(this.base_path + 'user/avatar', file)
    }


    // get anwer by user
    getUserProfil(user_id: string): Observable<Answer> {
        return this.http
            .get<Answer>(this.base_path + 'user/' + user_id, this.httpOptions)
    }
    // get anwer by user
    getMyProfil(): Observable<Answer> {
        return this.http
            .get<Answer>(this.base_path + 'user', this.httpOptions)
    }

}
