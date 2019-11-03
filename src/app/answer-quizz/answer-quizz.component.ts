import { Component, OnInit } from '@angular/core';
import {Quizz} from '../models/quizz';
import {ApiService} from '../services/api.service';
import { ActivatedRoute } from '@angular/router';
import {Answer, Question} from '../models/answer';
import {User} from '../models/user';
import {Choice} from '../models/answer';
import { ToastrService } from 'ngx-toastr';
import { MetafrenzyService } from 'ngx-metafrenzy';
import { environment } from '../../environments/environment';




@Component({
    selector: 'app-answer-quizz',
    templateUrl: './answer-quizz.component.html',
    styleUrls: ['./answer-quizz.component.scss']
})
export class AnswerQuizzComponent implements OnInit {

    avatar = environment.baseUrl + '/avatar/';
    quizz: Quizz;
    id: string;
    nbrQ: number;
    answer: Answer;
    currentUser: User;
    currentAnswer: Choice;
    currentQuestion: Question;
    indexQuestion: number;
    alreadyAnswer: boolean;
    result: number;
    finalString: string;
    myQuizz = false;
    allAnswer: Answer[];
    exist = true;
    report = false;
    isConnected = false;

    constructor(private api: ApiService,
                private route: ActivatedRoute,
                private toastr: ToastrService,
                private readonly metafrenzyService: MetafrenzyService) {
        this.id = this.route.snapshot.paramMap.get('id');

        this.metafrenzyService.setLinkTag({
            property: 'og:title',
            value: 'Deserv.me - Essayez de répondre à mon quizz',
        });
        this.api.getQuizz(this.id).subscribe((q: Quizz) => {
            this.metafrenzyService.setLinkTag({
                property: 'og:title',
                value: 'Deserv.me - ' + q.title
            });
            this.exist = true;
        }, err => {
            this.exist = false;
        });
    }

    ngOnInit() {
        this.nbrQ = 0;
        this.id = this.route.snapshot.paramMap.get('id');
        this.currentUser = JSON.parse(localStorage.getItem('user'));
        if (!this.currentUser) {
            this.isConnected = false;
            this.api.getQuizz(this.id).subscribe((q: Quizz) => {
                this.metafrenzyService.setLinkTag({
                    property: 'og:title',
                    value: 'Deserv.me - ' + q.title
                });
                this.exist = true;
                this.quizz = q;
            }, (err) => {
                this.exist = false;
            });
        } else {
            this.isConnected = true;
            this.api.getAnswerByUserId(this.id).subscribe((a: Answer) => {
                this.calculResult(a, true);
                this.alreadyAnswer = true;
            }, error => {
                this.alreadyAnswer = false;
                this.api.getQuizz(this.id).subscribe((q: Quizz) => {
                    this.metafrenzyService.setLinkTag({
                        property: 'og:title',
                        value: 'Deserv.me - ' + q.title
                    });
                    if (q.user_id == this.currentUser._id) {
                        this.exist = true;
                        this.quizz = q;
                        this.myQuizz = true;
                        this.api.getAnswerOfQuizz(this.id).subscribe((answers: Answer[]) => {
                            this.allAnswer = answers;
                            console.log(answers);
                        });
                    } else {
                        this.quizz = q;
                        this.answer = new Answer;
                        this.answer.user_id = this.currentUser._id;
                        this.answer.username = this.currentUser.username;
                        this.answer.avatar = this.currentUser.avatar;
                        this.answer.avatar_type = this.currentUser.avatar_type;
                        this.answer.questions = [new Question()];
                    }
                }, (err) => {
                    this.exist = false;
                });
            });
        }
    }
    previewQ() {
        this.nbrQ--;
    }

    calculResult(answer, alr) {
        console.log(answer);
        const total = answer.questions.length;
        let good = 0;

        this.api.getQuizz(this.id).subscribe((q: Quizz) => {
            this.quizz = q;
        })

        this.answer = answer;
        answer.questions.map(a => {
            if (a.answer.rep) {
                good++;
            }
        });
        this.result = 100 * good / total;
        if (alr) {
            this.finalString = 'Tu as déjà participé à ce quizz, ton résultat :';
        } else {
            this.finalString = 'Bravo tu as terminé, voici ton résultat :';
        }
    }

    returnResult(answer) {
        const total = answer.questions.length;
        let good = 0;

        answer.questions.map(a => {
            if (a.answer.rep) {
                good++;
            }
        });

        return 100 * good / total;
    }

    nextQ() {
        if (!this.currentAnswer) {
            this.toastr.error('Vous devez choisir une réponse');
        } else {
            this.answer.questions[this.nbrQ].name = this.currentQuestion.name;
            this.answer.questions[this.nbrQ].question_id = this.currentQuestion._id;
            this.answer.questions[this.nbrQ].answer = this.currentAnswer;
            this.nbrQ++;
            if (!this.answer.questions[this.nbrQ]) {
                this.answer.questions.push(new Question());
            }
            this.currentAnswer = new Choice();
            this.currentQuestion = new Question();
        }
    }

    uncheckAll(q, a) {
        if (!this.quizz.questions[q].choices[a].rep) {
            this.quizz.questions[q].choices.map(v => v.rep = false);
            this.quizz.questions[q].choices[a].rep = true;
        }
    }

    setAnswer(choice, question) {
        this.currentAnswer = choice;
        this.currentQuestion = question;
    }

    validateAnswer() {


        if (!this.currentAnswer) {
            this.toastr.error('Vous devez choisir une réponse');
        } else {
            this.answer.questions[this.nbrQ].name = this.currentQuestion.name;
            this.answer.questions[this.nbrQ].question_id = this.currentQuestion._id;
            this.answer.questions[this.nbrQ].answer = this.currentAnswer;
            this.api.createAnswer(this.answer, this.quizz._id).subscribe((answer) => {
                console.log(answer);
                this.calculResult(answer, false);
                this.alreadyAnswer = true;
            }, (error) => {
                this.toastr.error('Une erreur est survenue');
            });
        }
    }


    reportQuizz() {
        this.api.reportQuizz(this.id).subscribe((r: any) => {
            this.toastr.success('Merci d\'avoir signalé le quizz');
            this.report = true;
        }, (err) => {
            this.toastr.error('Une erreur est survenue');
        });
    }

    getAvatar(id) {
        return environment.baseUrl + 'avatar/' + id + '.jpg';
    }
}
