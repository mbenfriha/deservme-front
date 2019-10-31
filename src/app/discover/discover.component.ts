import { Component, OnInit } from '@angular/core';
import {ApiService} from '../services/api.service';
import {Quizz} from '../models/quizz';

@Component({
  selector: 'app-discover',
  templateUrl: './discover.component.html',
  styleUrls: ['./discover.component.scss']
})
export class DiscoverComponent implements OnInit {

  quizzs: Quizz[];

  constructor(private api: ApiService) { }

  ngOnInit() {
    this.api.getAllQuizz().subscribe((q: Quizz[]) => {
      this.quizzs = q;
    });
  }

}
