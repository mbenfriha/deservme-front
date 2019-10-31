import {Component, Input, OnInit} from '@angular/core';
import {User} from '../models/user';
import {Quizz} from '../models/quizz';

@Component({
  selector: 'app-single-quizz-list',
  templateUrl: './single-quizz-list.component.html',
  styleUrls: ['./single-quizz-list.component.scss']
})
export class SingleQuizzListComponent implements OnInit {

  @Input() quizz: Quizz;

  constructor() { }

  ngOnInit() {
  }

}
