import {Component, Input, OnInit} from '@angular/core';
import {environment} from "../../../../environments/environment";
import {Quizz} from "../../../models/quizz";

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


    getAvatar(id) {
        return environment.baseUrl + 'avatar/' + id + '.jpg';
    }

}
