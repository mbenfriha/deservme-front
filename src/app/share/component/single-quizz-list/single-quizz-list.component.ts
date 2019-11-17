import {Component, Input, OnInit} from '@angular/core';
import {environment} from "../../../../environments/environment";
import {Quizz} from "../../../models/quizz";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-single-quizz-list',
  templateUrl: './single-quizz-list.component.html',
  styleUrls: ['./single-quizz-list.component.scss']
})
export class SingleQuizzListComponent implements OnInit {

  @Input() quizz: Quizz;

  constructor(private readonly translate: TranslateService) {
      this.translate.setDefaultLang('en');
      this.translate.use(this.translate.getBrowserLang());
  }

  ngOnInit() {
  }


    getAvatar(id) {
        return environment.baseUrl + 'avatar/' + id + '.jpg';
    }

}
