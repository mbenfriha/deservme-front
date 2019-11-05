import { Component, OnInit } from '@angular/core';
import {ApiService} from '../services/api.service';
import {Quizz} from '../models/quizz';
import {MetafrenzyService} from 'ngx-metafrenzy';

@Component({
  selector: 'app-discover',
  templateUrl: './discover.component.html',
  styleUrls: ['./discover.component.scss']
})
export class DiscoverComponent implements OnInit {

  quizzs: Quizz[];

  constructor(private api: ApiService,
              private readonly metafrenzyService: MetafrenzyService) {
      this.metafrenzyService.setAllTitleTags('MyQuizzy - Découvre les quizz de la semaine');
      this.metafrenzyService.setAllDescriptionTags('Découvre tous les meilleurs quizz crée cette semaine');

  }

  ngOnInit() {
    this.api.getAllQuizz().subscribe((q: Quizz[]) => {
      this.quizzs = q;
    });
  }

}
