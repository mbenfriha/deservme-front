import {Component, Input, OnInit} from '@angular/core';
import {User} from '../models/user';
import {environment} from '../../environments/environment';

import { faSortAlphaDown, faSortNumericDown } from '@fortawesome/free-solid-svg-icons';

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

    asc = true;
    faSortAlphaDown = faSortAlphaDown;
    faSortNumericDown = faSortNumericDown;

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

    sortBy() {
        this.asc = !this.asc;
      if (!this.asc) {
          this.allAnswer.sort((a: any, b: any) => (a.username > b.username) ? 1 : -1);
      } else {
          this.allAnswer.sort((a: any, b: any) => (a.username < b.username) ? 1 : -1);
      }
        this.allAnswer;
    }

    top() {
        this.asc = !this.asc;
        if (!this.asc) {
            this.allAnswer.sort((a: any, b: any) => (this.returnResult(a) > this.returnResult(b)) ? 1 : -1);
        } else {
            this.allAnswer.sort((a: any, b: any) => (this.returnResult(a) < this.returnResult(b)) ? 1 : -1);
        }

    }

}
