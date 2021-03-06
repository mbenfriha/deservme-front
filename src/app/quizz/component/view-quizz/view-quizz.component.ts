import {AfterContentChecked, AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import {environment} from "../../../../environments/environment";
import {Quizz} from "../../../models/quizz";
import {Answer, Choice, Question} from "../../../models/answer";
import {User} from "../../../models/user";
import {Subject, Subscription} from "rxjs";
import {QuizzService} from "../../service/quizz.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {MetafrenzyService} from "ngx-metafrenzy";
import {AuthenticationService} from "../../../core/authentication/authentication.service";
import {debounceTime, take} from "rxjs/operators";
import {isNullOrUndefined} from "util";

declare var $: any;
declare var jQuery: any;

@Component({
    selector: 'app-view-quizz',
    templateUrl: './view-quizz.component.html',
    styleUrls: ['./view-quizz.component.scss']
})
export class ViewQuizzComponent implements OnInit, OnDestroy, AfterViewInit {

    avatar = environment.baseUrl + '/avatar/';
    quizz: Quizz;
    allQuizz: Quizz[] = null;
    id: string;
    nbrQ: number;
    answer: Answer;
    currentUser: User = null;
    currentAnswer: Choice;
    currentQuestion: Question;
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
    subjectClose: Subject<any> = new Subject();
    subjectReport: Subject<any> = new Subject();
    shortUrl = environment.shortUrl;
    getCarous = false;

    constructor(private quizzService: QuizzService,
                private route: ActivatedRoute,
                private toastr: ToastrService,
                private router: Router,
                private readonly metafrenzyService: MetafrenzyService,
                private authenticationService: AuthenticationService) {

        this.router.routeReuseStrategy.shouldReuseRoute = function () {
            return false;
        };
        this.id = this.route.snapshot.paramMap.get('id');
        this.quizzService.getQuizzById(this.id).pipe(take(1)).subscribe((q: Quizz) => {

            this.metafrenzyService.setAllTitleTags('MyQuizzy - ' + q.title);
            this.metafrenzyService.setAllDescriptionTags('Viens répondre au quizz de ' + q.username);

            this.metafrenzyService.setOpenGraph({
                type: 'website',
                url: 'https://myquizzy.com/quizz/' + q._id,
                image: 'https://myquizzy.com/assets/images/cliquetoplay.png',
            });

            this.exist = true;
            this.quizz = q;
            console.log(this.quizz);

            this.answer = new Answer;
            this.answer.questions = [new Question()];
            this.answer.avatar = this.quizz.user_id;
            this.currentUser =  this.authenticationService.currentUser.getValue();
            if (!isNullOrUndefined(this.currentUser)) {
                this.isConnected = true;
                this.quizzService.getAnswerByUserAndQuizz(this.id).pipe(take(1)).subscribe((a: Answer) => {
                    this.calculResult(a, true);
                    this.alreadyAnswer = true;
                    this.quizzService.getAllQuizzRand().pipe(take(1)).subscribe((allq: Quizz[]) => {
                        this.allQuizz = allq;
                    }, err => {
                        console.log(err);
                    }, () => {
                            setInterval(() => {
                                if (!this.getCarous && this.allQuizz.length > 0) {
                                    jQuery('.carousel.carousel-slider').carousel({
                                        indicators: true,
                                        fullWidth: true,
                                    });
                                    this.getCarous = true;
                                }
                            }, 100);
                    });
                }, error => {

                    this.alreadyAnswer = false;
                    if (this.quizz.user_id == this.currentUser._id) {
                        this.myQuizz = true;
                    }
                    this.answer.title = this.quizz.title;
                    this.answer.user_id = this.currentUser._id;
                    this.answer.username = this.currentUser.username;
                    this.answer.avatar_type = this.currentUser.avatar_type;
                    this.answer.questions = [new Question()];
                }, () => {});
            }
        }, err => {
            this.exist = false;
        }, () => {
            this.quizzService.getAnswerOfQuizz(this.id).pipe(take(1)).subscribe((answers: Answer[]) => {
                this.allAnswer = answers;
                console.log(this.alreadyAnswer);
            });
        });


    }
    ngAfterViewInit() {}
    ngOnInit() {

        // create subject for debouncetime, anti spam backend
        this.subjectState
            .pipe(debounceTime(500))
            .subscribe(() => {
                    this.changeState();
                }
            );
        this.subjectClose
            .pipe(debounceTime(500))
            .subscribe(() => {
                    this.changeClose();
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
    }
    previewQ() {
        this.nbrQ--;
        this.currentQuestion.name = this.answer.questions[this.nbrQ].name;
        this.currentQuestion._id = this.answer.questions[this.nbrQ].question_id;
        this.currentAnswer = this.answer.questions[this.nbrQ].answer;

    }

    calculResult(answer, alr) {


        const total = answer.questions.filter(q => q.name).length;
        let good = 0;

        this.quizzService.getQuizzById(this.id).subscribe((q: Quizz) => {
            this.quizz = q;
        });

        this.answer = answer;
        answer.questions.filter(q => q.name).map(a => {
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
        const total = answer.questions.filter(q => q.name).length;
        let good = 0;

        answer.questions.filter(q => q.name).map(a => {
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

    validateAnswerAnony() {
        this.answer.username = this.username;
        if (isNullOrUndefined(this.answer.username)) {
            this.toastr.error('Vous devez rentrer un pseudo');
        } else if (!RegExp('^[A-Za-zÀ-ÖØ-öø-ÿ0-9._-]*$').test(this.answer.username) && !this.isConnected) {
            this.toastr.error('Le pseudo ne peut contenir que des chiffres et lettres et les caractères : "_" "-" "."' );
        } else if (!this.isConnected && (this.answer.username.length < 3 || this.answer.username.length > 16)) {
            this.toastr.error('Le pseudo doit faire 3 caractères au minimum');

        } else {
            if (!this.currentAnswer) {
                this.toastr.error('Vous devez choisir une réponse');

            } else {
                this.answer.questions[this.nbrQ].name = this.currentQuestion.name;
                this.answer.questions[this.nbrQ].question_id = this.currentQuestion._id;
                this.answer.questions[this.nbrQ].answer = this.currentAnswer;
            }

            this.answer.questions.pop()
            this.quizzService.createAnswerAnony(this.answer, this.quizz._id).pipe(take(1)).subscribe((answer) => {
                this.calculResult(answer, false);
                this.alreadyAnswer = true;
                this.quizzService.getAnswerOfQuizz(this.id).pipe(take(1)).subscribe((answers: Answer[]) => {
                    this.allAnswer = answers;
                    this.quizzService.getAllQuizzRand().pipe(take(1)).subscribe((allq: Quizz[]) => {
                        this.allQuizz = allq;
                    }, err => {
                        console.log(err);
                    }, () => {
                        setInterval(() => {

                            if (!this.getCarous && this.allQuizz.length > 0) {
                                jQuery('.carousel.carousel-slider').carousel({
                                    indicators: true,
                                    fullWidth: true,
                                });
                                this.getCarous = true;
                            }
                        }, 100);
                    });

                });
            }, (error) => {
                this.toastr.error('Une erreur est survenue');
            });
        }
    }

    validateAnswer() {
        if (!this.currentAnswer) {
            this.toastr.error('Vous devez choisir une réponse');
        } else {
            this.answer.questions[this.nbrQ].name = this.currentQuestion.name;
            this.answer.questions[this.nbrQ].question_id = this.currentQuestion._id;
            this.answer.questions[this.nbrQ].answer = this.currentAnswer;
        }
        this.quizzService.createAnswer(this.answer, this.quizz._id).pipe(take(1)).subscribe((answer) => {
            this.calculResult(answer, false);
            this.alreadyAnswer = true;
            this.quizzService.getAnswerOfQuizz(this.id).pipe(take(1)).subscribe((answers: Answer[]) => {
                this.allAnswer = answers;
                this.quizzService.getAllQuizzRand().pipe(take(1)).subscribe((allq: Quizz[]) => {
                    this.allQuizz = allq;
                }, err => {
                    console.log(err);
                }, () => {
                    setInterval(() => {

                        if (!this.getCarous && this.allQuizz.length > 0) {
                            jQuery('.carousel.carousel-slider').carousel({
                                indicators: true,
                                fullWidth: true,
                            });
                            this.getCarous = true;
                        }
                    }, 100);
                });
            });
        }, (error) => {
            this.toastr.error('Une erreur est survenue');

        });

    }


    reportQuizz() {
        this.quizzService.reportQuizz(this.id).pipe(take(1)).subscribe((r: any) => {
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
            this.quizzService.changeStateQuizz(this.id).pipe(take(1)).subscribe((q: Quizz) => {
                    this.quizz = q;
                    this.toastr.success('ton quizz est maintenant en ' + (this.quizz.private ? 'privé' : 'public'));
                }, (err) =>
                    this.toastr.error('Une erreur est survenue')
            );
        }
    }

    changeClose() {
        if (this.quizz.user_id == this.currentUser._id) {
            this.quizzService.changeCloseQuizz(this.id).pipe(take(1)).subscribe((q: Quizz) => {
                    this.quizz = q;
                    this.toastr.success('ton quizz est maintenant en ' + (this.quizz.close ? 'fermé' : 'ouvert'));
                }, (err) =>
                    this.toastr.error('Une erreur est survenue')
            );
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
    setClose() {
        this.subjectClose.next();
    }


    deleteQuizz() {
        if (this.quizz.user_id == this.currentUser._id) {
            this.quizzService.deleteQuizz(this.id).subscribe((q: Quizz) => {
                    this.router.navigate(['/profile/' + this.currentUser._id]);
                }, (err) =>
                    this.toastr.error('Une erreur est survenue')
            );
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

    ngOnDestroy(): void {}
}
