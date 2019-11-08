import {Component, Input, OnInit} from '@angular/core';
import {User} from '../models/user';
import {environment} from '../../environments/environment';

@Component({
    selector: 'app-answers-list',
    templateUrl: './answers-list.component.html',
    styleUrls: ['./answers-list.component.scss']
})
export class AnswersListComponent implements OnInit {

    @Input() allAnswer: [];

    asc = true;

    constructor() { }

    ngOnInit() {
    }

    getAvatar(id) {
        return environment.baseUrl + 'avatar/' + id + '.jpg';
    }

    returnResult(answer) {
        const total = answer.questions.length;
        let good = 0;

        answer.questions.map(a => {
            if (a.answer.rep) {
                good++;
            }
        });

        return parseInt((100 * good / total).toFixed());
    }

    sortBy() {
      this.asc = !this.asc;
      if (!this.asc) {
          this.allAnswer.sort((a: any, b: any) => (a.username > b.username) ? 1 : -1);
      } else {
          this.allAnswer.sort((a: any, b: any) => (a.username < b.username) ? 1 : -1);
      }
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
