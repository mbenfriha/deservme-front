import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import {ApiService} from '../services/api.service';
import {Quizz} from '../models/quizz';
import {User} from '../models/user';
import { ToastrService } from 'ngx-toastr';
import {MetafrenzyService} from 'ngx-metafrenzy';
import {StorageMap} from '@ngx-pwa/local-storage';


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
              private storage: StorageMap) {
      this.metafrenzyService.setAllTitleTags('MyQuizzy - Mes quizz');
      this.metafrenzyService.setAllDescriptionTags('Liste de tes quizz');
  }

  ngOnInit() {
      this.id = this.route.snapshot.paramMap.get('id');
      this.storage.get('user').subscribe((user: any) => {
          if(user != null) {
              this.currentUser = user;
              if (this.id == this.currentUser._id) {
                  this.myQuizz = true;
                  this.api.getMyQuizz(this.id).subscribe((q: Quizz[]) => {
                      this.quizzs = q;
                  });
              }
          }
      });


  }

}
