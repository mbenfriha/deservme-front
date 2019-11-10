import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import {ApiService} from '../services/api.service';
import {Quizz} from '../models/quizz';
import {User} from '../models/user';
import { ToastrService } from 'ngx-toastr';
import {MetafrenzyService} from 'ngx-metafrenzy';
import {AuthenticationService} from '../services/authentication.service';


@Component({
  selector: 'app-my-quizz',
  templateUrl: './my-quizz.component.html',
  styleUrls: ['./my-quizz.component.scss']
})
export class MyQuizzComponent implements OnInit {

  quizzs: Quizz[];
  currentUser: User;
  id: string;
  report = false;
  myQuizz = false;

  constructor(private api: ApiService,
              private route: ActivatedRoute,
              private toastr: ToastrService,
              private readonly metafrenzyService: MetafrenzyService,
              private authenticationService: AuthenticationService) {
      this.metafrenzyService.setAllTitleTags('MyQuizzy - Mes quizz');
      this.metafrenzyService.setAllDescriptionTags('Liste de tes quizz');

      this.authenticationService.currentUser.subscribe(x => this.currentUser = x);

  }

  ngOnInit() {
      this.id = this.route.snapshot.paramMap.get('id');
              if (this.id == this.currentUser._id) {
                  this.myQuizz = true;
                  this.api.getMyQuizz(this.id).subscribe((q: Quizz[]) => {
                      this.quizzs = q;
                  });
              }


  }

}
