import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ApiService} from '../services/api.service';
import {User} from '../models/user';
import {Quizz} from '../models/quizz';
import {environment} from '../../environments/environment';
import {Answer} from '../models/answer';

@Component({
    selector: 'app-user-profil',
    templateUrl: './user-profil.component.html',
    styleUrls: ['./user-profil.component.scss']
})
export class UserProfilComponent implements OnInit {

    id: string;
    user: User;
    quizzs: Quizz;
    answers: Answer;

    constructor(private route: ActivatedRoute,
                private api: ApiService) {
        this.id = this.route.snapshot.paramMap.get('id');
        console.log('ok');
        this.api.getUserQuizz(this.id).subscribe((resp: any) => {
            if(resp.user) {
                this.user = resp.user;
                this.quizzs = resp.quizz;
                this.answers = resp.answers;
            } else {
                
            }
           
        }, err => {
          console.log(err);
        });
    }



    getAvatar(id) {
        return environment.baseUrl + 'avatar/' + id + '.jpg';
    }
    ngOnInit() {
    }

}
