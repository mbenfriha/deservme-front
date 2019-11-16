import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {Choice, Question, Quizz} from "../../../models/quizz";
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";
import {QuizzService} from "../../service/quizz.service";
import {Subscription} from "rxjs";
import {take} from "rxjs/operators";

@Component({
  selector: 'app-create-quizz',
  templateUrl: './create-quizz.component.html',
  styleUrls: ['./create-quizz.component.scss']
})
export class CreateQuizzComponent implements OnInit, OnDestroy {

    quizz: Quizz;
    question: Question;
    answer: Choice;
    answers: [Choice, Choice];
    createQuizzSub: Subscription;

    @Output() quizzCreated = new EventEmitter<any>();


    constructor(private quizzService: QuizzService,
                private toastr: ToastrService,
                private route: Router) { }

    ngOnInit() {
        this.quizz = new Quizz;
        this.quizz.title = '';
        this.quizz.private = false;
        this.quizz.close = false;
        this.question = new Question;
        this.question.name = '';
        this.answers = [new Choice, new Choice] ;
        this.answers[0].name = '';
        this.answers[0].rep = true;
        this.answers[1].name = '';
        this.answers[1].rep = false;
        this.question.choices = [this.answers[0]];
        this.question.choices.push(this.answers[1]);
        this.quizz.questions = [this.question];
        console.log(this.quizz);
    }

    uncheckAll(q, a) {
        if (!this.quizz.questions[q].choices[a].rep) {
            this.quizz.questions[q].choices.map(v => v.rep = false);
            this.quizz.questions[q].choices[a].rep = true;
        } else {
            console.log(a);
            if (a == 0) {
                console.log(0)
                this.quizz.questions[q].choices.map(v => v.rep = false);
                this.quizz.questions[q].choices[a + 1].rep = true;
            } else {
                this.quizz.questions[q].choices.map(v => v.rep = false);

                this.quizz.questions[q].choices[a - 1].rep = true;
            }
        }
    }

    addAnswer(nbr) {
        console.log(nbr);
        this.answer = new Choice;
        this.answer.name = '';
        this.answer.rep = false;
        this.quizz.questions[nbr].choices.push(this.answer);
    }

    addQuestion() {
        this.question = new Question;
        this.question.name = '';
        this.answers = [new Choice, new Choice] ;
        this.answers[0].name = '';
        this.answers[0].rep = true;
        this.answers[1].name = '';
        this.answers[1].rep = false;
        this.question.choices = [this.answers[0]];
        this.question.choices.push(this.answers[1]);
        this.quizz.questions.push(this.question);
    }

    createQuizz()  {
        if (!this.verifyQuestion(this.quizz.questions)) {
            this.toastr.error('Vérifiez qu\'aucune questions/réponses n\'est vide');

        } else if (this.quizz.questions.length < 1) {
            this.toastr.error('Votre quizz doit comporter au moins une question');

        } else if (!this.quizz.title) {
            this.toastr.error('Vous devez donner un titre à votre quizz');

        } else {
          this.createQuizzSub =  this.quizzService.createQuizz(this.quizz).pipe(take(1)).subscribe((v: Quizz) => {
                console.log(v);
                this.quizzCreated.emit(v);
                this.route.navigate(['/quizz/'+v._id])
            }, error => {
                console.log(error);
                this.quizzCreated.emit(false);
            });
        }
    }

    deleteAnswer(q, a) {
        console.log(q, a)
        if (this.quizz.questions[q].choices.length > 2) {
            if (!this.quizz.questions[q].choices[a].rep) {
                this.quizz.questions[q].choices.splice(a, 1);
            } else {
                this.quizz.questions[q].choices.splice(a, 1);
                this.quizz.questions[q].choices[0].rep = true;
            }
        } else {
            this.toastr.error('Deux réponses minimum par question');
        }
    }

    deleteQuestion(q) {
        this.quizz.questions.splice(q, 1);
    }

    verifyQuestion(question) {
        let empty = true;
        question.filter((q) => {
            if (!q.name) {
                empty = false;
            }
        });
        question.map(q => q.choices.filter(a => {
            if (!a.name) {
                empty = false;
            }
        }));
        return empty;
    }

    checkPrivate() {
        console.log(this.quizz.private);
    }

    ngOnDestroy(): void {}
}
