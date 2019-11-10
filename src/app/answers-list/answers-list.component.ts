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
    elm = 'date'

    asc = true;
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
            this.elm = filter
            this.asc = !this.asc;
            if (!this.asc) {
                this.allAnswer.sort((a: any, b: any) => (a.username > b.username) ? 1 : -1);
            } else {
                this.allAnswer.sort((a: any, b: any) => (a.username < b.username) ? 1 : -1);
            }
        } else if(filter == 'date') {
            this.elm = filter
            this.asc = !this.asc;
            if (!this.asc) {
                this.allAnswer.sort((a: any, b: any) => (a.createdAT > b.createdAT) ? 1 : -1);
            } else {
                this.allAnswer.sort((a: any, b: any) => (a.createdAT < b.createdAT) ? 1 : -1);
            }
        }
    }

    top() {
        this.elm = 'num'
        this.asc = !this.asc;
        if (!this.asc) {
            this.allAnswer.sort((a: any, b: any) => (this.returnResult(a) > this.returnResult(b)) ? 1 : -1);
        } else {
            this.allAnswer.sort((a: any, b: any) => (this.returnResult(a) < this.returnResult(b)) ? 1 : -1);
        }

    }

}
