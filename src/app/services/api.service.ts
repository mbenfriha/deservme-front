import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { User } from '../models/user';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  // API path
  base_path = 'http://localhost:3000/';

  constructor(private http: HttpClient) { }

  // Http Options
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  // Handle API errors
  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  }

  // Create a new item
  createUser(user): Observable<User> {
    return this.http
      .post<User>(this.base_path + 'register', JSON.stringify(user), this.httpOptions)
      .pipe(
        retry(0),
        catchError(this.handleError)
      );
  }

  // Get single student data by ID
  getCurrentUser(): Observable<User> {
    return this.http
      .get<User>(this.base_path + 'user', { withCredentials: true })
      .pipe(
        retry(0),
        catchError(this.handleError)
      );
  }

  // Get single student data by ID
  getCurrentUsername(username): Observable<User> {
    return this.http
      .get<User>(this.base_path + 'username/' + username, { withCredentials: true })
      .pipe(
        retry(0),
        catchError(this.handleError)
      );
  }

  // Create a new item
  updateUser(user): Observable<User> {
    return this.http
      .post<User>(this.base_path + 'update', JSON.stringify(user), this.httpOptions)
      .pipe(
        retry(0),
        catchError(this.handleError)
      );
  }
}
