import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { User } from '../models/user';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import {Quizz} from '../models/quizz';
import {Answer} from '../models/answer';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  // API path
  base_path = environment.baseUrl;

  constructor(private http: HttpClient) { }

  // Http Options
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
    withCredentials: true
  }

  // Handle API errors
  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      if (error.status) {
        localStorage.removeItem('user');
      }
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error.message}`);
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

  // create quizz
  createQuizz(quizz): Observable<Quizz> {
    return this.http
      .post<Quizz>(this.base_path + 'quizz/create', JSON.stringify(quizz), this.httpOptions)
      .pipe(
        retry(0),
        catchError(this.handleError)
      );
  }

  // get all quizz
  getAllQuizz(): Observable<Quizz[]> {
    return this.http
      .get<Quizz[]>(this.base_path + 'quizz', this.httpOptions)
      .pipe(
        retry(0),
        catchError(this.handleError)
      );
  }

  // get quizz by user
  getMyQuizz(id: string): Observable<Quizz[]> {
    return this.http
      .get<Quizz[]>(this.base_path + 'quizzs/' + id, this.httpOptions)
      .pipe(
        retry(0),
        catchError(this.handleError)
      );
  }

  // get quizz by user
  getQuizz(id: string): Observable<Quizz> {
    return this.http
      .get<Quizz>(this.base_path + 'quizz/' + id, this.httpOptions)
      .pipe(
        retry(0),
        catchError(this.handleError)
      );
  }

  // create answer
  createAnswer(answer: Answer, quizz_id: string): Observable<Answer> {
    return this.http
      .post<Answer>(this.base_path + 'answer/create/' + quizz_id, JSON.stringify(answer), this.httpOptions)
      .pipe(
        retry(0),
        catchError(this.handleError)
      );
  }
  // get anwer by user
  getAnswerByUserId(quizz_id: string): Observable<Answer> {
    return this.http
      .get<Answer>(this.base_path + 'answerUser/' + quizz_id, this.httpOptions)
      .pipe(
        retry(0),
        catchError(this.handleError)
      );
  }

  // get anwer by user
  getAnswerOfQuizz(quizz_id: string): Observable<Answer[]> {
    return this.http
      .get<Answer[]>(this.base_path + 'answers/' + quizz_id, this.httpOptions)
      .pipe(
        retry(0),
        catchError(this.handleError)
      );
  }

}
