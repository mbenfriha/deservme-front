import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import {ApiService} from '../services/api.service';
import {Quizz} from '../models/quizz';
import {User} from '../models/user';

@Component({
  selector: 'app-my-quizz',
  templateUrl: './my-quizz.component.html',
  styleUrls: ['./my-quizz.component.scss']
})
export class MyQuizzComponent implements OnInit {

  quizzs: Quizz[];
  currentUser: User;
  id: string;

  constructor(private api: ApiService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.currentUser = JSON.parse(localStorage.getItem('user'));
    this.id = this.route.snapshot.paramMap.get('id');
    this.api.getMyQuizz(this.id).subscribe((q: Quizz[]) => {
      this.quizzs = q;
    });
  }

}
