import { Component, OnInit } from '@angular/core';
import {Quizz} from '../models/quizz';
import {ApiService} from '../services/api.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Answer, Question} from '../models/answer';
import {User} from '../models/user';
import {Choice} from '../models/answer';
import { ToastrService } from 'ngx-toastr';
import { MetafrenzyService } from 'ngx-metafrenzy';
import { environment } from '../../environments/environment';
import {Subject} from 'rxjs';
import {debounceTime, takeUntil} from 'rxjs/operators';
import {StorageMap} from '@ngx-pwa/local-storage';
import {AuthenticationService} from '../services/authentication.service';

declare var jQuery: any;



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
    result: string;
    finalString: string;
    myQuizz = false;
    allAnswer: Answer[];
    exist = true;
    report = false;
    isConnected = false;
    username =  '';
    modal = false;
    modalDelete = false;
    subjectState: Subject<any> = new Subject();
    subjectReport: Subject<any> = new Subject();
    tab = 'top'
    shortUrl = environment.shortUrl;

    constructor(private api: ApiService,
                private route: ActivatedRoute,
                private toastr: ToastrService,
                private router: Router,
                private readonly metafrenzyService: MetafrenzyService,
                private storage: StorageMap,
                private authenticationService: AuthenticationService) {
        this.id = this.route.snapshot.paramMap.get('id');
        this.authenticationService.currentUser.subscribe(x => {

            this.currentUser = x;
            if(this.currentUser) {
                this.isConnected = true;
            }

            this.api.getQuizz(this.id).subscribe((q: Quizz) => {
                this.metafrenzyService.setAllTitleTags('MyQuizzy - ' + q.title);
                this.metafrenzyService.setAllDescriptionTags('Viens répondre au quizz de ' + q.username);
                this.exist = true;
                this.quizz = q;
                this.answer = new Answer;
                this.answer.questions = [new Question()];
                if(this.isConnected) {
                    console.log(this.currentUser, 'ok');
                    this.isConnected = true;
                    this.api.getAnswerByUserId(this.id).subscribe((a: Answer) => {
                        this.calculResult(a, true);
                        this.alreadyAnswer = true;
                    }, error => {
                        this.alreadyAnswer = false;
                        if (this.quizz.user_id == this.currentUser._id) {
                            this.myQuizz = true;
                        }

                        this.answer.user_id = this.currentUser._id;
                        this.answer.username = this.currentUser.username;
                        this.answer.avatar = this.currentUser.avatar;
                        this.answer.avatar_type = this.currentUser.avatar_type;
                        this.answer.questions = [new Question()];
                    });
                }
            }, err => {
                this.exist = false;
            });

        }, error => {} );

        console.log(this.currentUser);
    }

    ngOnInit() {



        jQuery('.tabs').tabs();

        // create subject for debouncetime, anti spam backend
        this.subjectState
            .pipe(debounceTime(500))
            .subscribe(() => {
                    this.changeState();
                }
            );
        this.subjectReport
            .pipe(debounceTime(500))
            .subscribe(() => {
                    this.reportQuizz();
                }
            );
        this.nbrQ = 0;
        this.id = this.route.snapshot.paramMap.get('id');

        this.api.getAnswerOfQuizz(this.id).subscribe((answers: Answer[]) => {
            this.allAnswer = answers;
        });

    }
    previewQ() {
        this.nbrQ--;
        this.currentQuestion.name = this.answer.questions[this.nbrQ].name;
        this.currentQuestion._id = this.answer.questions[this.nbrQ].question_id;
        this.currentAnswer = this.answer.questions[this.nbrQ].answer;

    }

    calculResult(answer, alr) {
        const total = answer.questions.length;
        let good = 0;

        this.api.getQuizz(this.id).subscribe((q: Quizz) => {
            this.quizz = q;
        });

        this.answer = answer;
        answer.questions.map(a => {
            if (a.answer.rep) {
                good++;
            }
        });
        const number = (100 * good / total).toFixed();
        this.result = number;
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

        return (100 * good / total).toFixed();
    }

    nextQ() {
        if (!this.currentAnswer) {
            this.toastr.error('Vous devez choisir une réponse');
        } else if (!this.currentAnswer.name) {
            this.toastr.error('Vous devez choisir une réponse');
        } else {
            this.answer.questions[this.nbrQ].name = this.currentQuestion.name;
            this.answer.questions[this.nbrQ].question_id = this.currentQuestion._id;
            this.answer.questions[this.nbrQ].answer = this.currentAnswer;
            this.nbrQ++;
            if (!this.answer.questions[this.nbrQ]) {
                this.answer.questions.push(new Question());
                this.currentAnswer = new Choice();
                this.currentQuestion = new Question();
            }
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

            if (!this.isConnected) {
                this.answer.username = this.username;
            }

            if (!this.answer.username) {
                this.toastr.error('Vous devez rentrer un pseudo');
            } else if (!RegExp('^[A-Za-zÀ-ÖØ-öø-ÿ0-9._-]*$').test(this.answer.username)) {
                this.toastr.error('Le pseudo ne peut contenir que des chiffres et lettres et les caractères : "_" "-" "."' );
            } else if (this.answer.username.length < 3 || this.answer.username.length > 16) {
                this.toastr.error('Le pseudo doit faire 3 caractères au minimum');
            } else {
                if (!this.isConnected) {
                    this.answer.questions.pop();
                }
                this.api.createAnswer(this.answer, this.quizz._id).subscribe((answer) => {
                    this.calculResult(answer, false);
                    this.alreadyAnswer = true;
                    this.api.getAnswerOfQuizz(this.id).subscribe((answers: Answer[]) => {
                        this.allAnswer = answers;
                    });
                }, (error) => {
                    this.toastr.error('Une erreur est survenue');
                });
            }
        }
    }


    reportQuizz() {
        this.api.reportQuizz(this.id).subscribe((r: any) => {
            this.toastr.success('Merci d\'avoir signalé le quizz');
            this.report = true;
        }, (err) => {
            console.log(err);
            this.report = true;
            this.toastr.error(err.message);
        });
    }

    changeState() {
        if (this.quizz.user_id == this.currentUser._id) {
            this.api.changeStateQuizz(this.id).subscribe((q: Quizz) => {
                this.quizz = q;
                this.toastr.success('ton quizz est maintenant en ' + (this.quizz.private ? 'privé' : 'public'));
            }, (err) => this.toastr.error('Une erreur est survenue'));
        }
    }

    openModalDelete() {
        this.modalDelete = true;
    }
    closeModalDelete() {
        this.modalDelete = false;
    }

    sendReport() {
        this.subjectReport.next();
    }

    setState() {
        this.subjectState.next();
    }
    deleteQuizz() {
        if (this.quizz.user_id == this.currentUser._id) {
            this.api.deleteQuizz(this.id).subscribe((q: Quizz) => {
                this.router.navigate(['/allQuizz/' + this.currentUser._id]);
            }, (err) => this.toastr.error('Une erreur est survenue'));
        }
    }

    getAvatar(id) {
        return environment.baseUrl + 'avatar/' + id + '.jpg';
    }

    openModal() {
        this.modal = true;
    }
    closeModal() {
        this.modal = false;
    }

    displayTab(tab) {
        this.tab = tab;
    }

}
