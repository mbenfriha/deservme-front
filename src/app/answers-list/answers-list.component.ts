import {Component, Input, OnInit} from '@angular/core';
import {User} from '../models/user';
import {environment} from '../../environments/environment';

import { faSortAlphaDown, faSortNumericDown, faSortAlphaUp, faSortNumericUp, faSortAmountDown, faSortAmountUp } from '@fortawesome/free-solid-svg-icons';

declare var jQuery: any;
@Component({
    selector: 'app-answers-list',
    templateUrl: './answers-list.component.html',
    styleUrls: ['./answers-list.component.scss']
})
export class AnswersListComponent implements OnInit {

    @Input() allAnswer: [];
    @Input() myQuizz: false;
    change= false;
    asc = {
        date: true,
        alpha: false,
        top: false
    };
    elm ='date'
    faSortAlphaDown = faSortAlphaDown;
    faSortNumericDown = faSortNumericDown;
    faSortAlphaUp = faSortAlphaUp;
    faSortNumericUp = faSortNumericUp;
    faSortAmountDown = faSortAmountDown;
    faSortAmountUp  = faSortAmountUp;

    constructor() { }

    ngOnInit() {
    }

    getAvatar(id) {
        return environment.baseUrl + 'avatar/' + id + '.jpg';
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

    sortBy(filter) {


        if(filter == 'alpha') {
            this.asc.alpha = !this.asc.alpha;
            this.asc.date = false;
            this.asc.top = false;
            this.elm = 'alpha';
            if (!this.asc.alpha) {
                this.allAnswer.sort((a: any, b: any) => (a.username > b.username) ? 1 : -1);
            } else {
                this.allAnswer.sort((a: any, b: any) => (a.username < b.username) ? 1 : -1);
            }
        } else if(filter == 'date') {
            this.asc.date = !this.asc.date;
            this.asc.alpha = false;
            this.asc.top = false;
            this.elm = 'date';
            if (!this.asc.date) {
                this.allAnswer.sort((a: any, b: any) => (a.createdAt > b.createdAt) ? 1 : -1);
            } else {
                this.allAnswer.sort((a: any, b: any) => (a.createdAt < b.createdAt) ? 1 : -1);
            }
        } else if(filter == 'top') {
            this.asc.top = !this.asc.top;
            this.asc.alpha = false;
            this.asc.date = false;
            this.elm = 'top';
            if (!this.asc.top) {
                this.allAnswer.sort((a: any, b: any) => (this.returnResult(a) > this.returnResult(b)) ? 1 : -1);
            } else {
                this.allAnswer.sort((a: any, b: any) => (this.returnResult(a) < this.returnResult(b)) ? 1 : -1);
            }
        }
    }
}
