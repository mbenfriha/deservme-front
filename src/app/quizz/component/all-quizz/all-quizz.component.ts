import {Component, OnDestroy, OnInit} from '@angular/core';
import {Quizz} from "../../../models/quizz";
import {QuizzService} from "../../service/quizz.service";
import {MetafrenzyService} from "ngx-metafrenzy";
import {Subscription} from "rxjs";
import {take} from "rxjs/operators";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-all-quizz',
  templateUrl: './all-quizz.component.html',
  styleUrls: ['./all-quizz.component.scss']
})
export class AllQuizzComponent implements OnInit, OnDestroy {


    quizzs: Quizz[];
    private getQuizz: Subscription;

    constructor(private quizzService: QuizzService,
                private readonly metafrenzyService: MetafrenzyService,
                private readonly translate: TranslateService) {
        translate.setDefaultLang(translate.getBrowserLang());
        this.metafrenzyService.setAllTitleTags('MyQuizzy - Découvre les quizz de la semaine');
        this.metafrenzyService.setAllDescriptionTags('Découvre tous les meilleurs quizz crée cette semaine');
    }

    ngOnInit() {
       this.getQuizz = this.quizzService.getAllQuizz().pipe(take(1)).subscribe((q: Quizz[]) => {
            this.quizzs = q;
        });
    }

    ngOnDestroy(): void {}
}
