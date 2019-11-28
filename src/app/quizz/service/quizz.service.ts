import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from "../../../environments/environment";
import {Observable} from "rxjs";
import {Quizz} from "../../models/quizz";
import {Answer} from "../../models/answer";

@Injectable()
export class QuizzService {

    base_path = environment.baseUrl;
  constructor(private http: HttpClient) { }


    // Http Options
    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
        }),
    };


    // create quizz
    createQuizz(quizz): Observable<Quizz> {
        return this.http
            .post<Quizz>(this.base_path + 'quizz/create', quizz, this.httpOptions);
    }

    // get all quizz
    getAllQuizz(): Observable<Quizz[]> {
        return this.http
            .get<Quizz[]>(this.base_path + 'quizz', this.httpOptions);
    }

    // get all quizz rand
    getAllQuizzRand(): Observable<Quizz[]> {
        return this.http
            .get<Quizz[]>(this.base_path + 'quizz/rand', this.httpOptions);
    }
    // get quizz by user id
    getQuizzByUser(id: string): Observable<Quizz[]> {
        return this.http
            .get<Quizz[]>(this.base_path + 'quizz/user/' + id, this.httpOptions);
    }

    // get single quizz
    getQuizzById(id: string): Observable<Quizz> {
        return this.http
            .get<Quizz>(this.base_path + 'quizz/' + id, this.httpOptions);
    }

    // change single quizz close
    changeCloseQuizz(quizz_id: string): Observable<Quizz> {
        return this.http
            .get<Quizz>(this.base_path + 'quizz/close/' + quizz_id, this.httpOptions);
    }

    // change state single quizz
    changeStateQuizz(quizz_id: string): Observable<Quizz> {
        return this.http
            .get<Quizz>(this.base_path + 'quizz/change/' + quizz_id, this.httpOptions);
    }

    // delete single quizz
    deleteQuizz(quizz_id: string): Observable<Quizz> {
        return this.http
            .get<Quizz>(this.base_path + 'quizz/delete/' + quizz_id, this.httpOptions);
    }

    // report quizz
    reportQuizz(quizz_id: string): Observable<Answer> {
        return this.http
            .get<Answer>(this.base_path + 'quizz/report/' + quizz_id, this.httpOptions)
    }

    // get answer by user and quizz
    getAnswerByUserAndQuizz(quizz_id: string): Observable<Answer> {
        return this.http
            .get<Answer>(this.base_path + 'answerUser/' + quizz_id, this.httpOptions)
    }

    // create answer
    createAnswer(answer: Answer, quizz_id: string): Observable<Answer> {
        return this.http
            .post<Answer>(this.base_path + 'answer/create/' + quizz_id, JSON.stringify(answer), this.httpOptions)
    }

    // create answer not registered user
    createAnswerAnony(answer: Answer, quizz_id: string): Observable<Answer> {
        return this.http
            .post<Answer>(this.base_path + 'answer/createAnonym/' + quizz_id, JSON.stringify(answer), this.httpOptions)
    }

    // get all anwer of quizz
    getAnswerOfQuizz(quizz_id: string): Observable<Answer[]> {
        return this.http
            .get<Answer[]>(this.base_path + 'answers/' + quizz_id, this.httpOptions)
    }
}
