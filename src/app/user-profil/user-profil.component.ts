import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ApiService} from '../services/api.service';
import {User} from '../models/user';
import {Quizz} from '../models/quizz';
import { environment } from '../../environments/environment';
import {Answer} from '../models/answer';
import {AuthenticationService} from '../services/authentication.service';
import {ToastrService} from 'ngx-toastr';
import {MetafrenzyService} from 'ngx-metafrenzy';

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
    currentUser: User;
    myProfil: boolean;
    shortUrl = 'qzzy.in/';

    tab = 'q'

    constructor(private route: ActivatedRoute,
                private router: Router,
                private api: ApiService,
                private authenticationService: AuthenticationService,
                private toastr: ToastrService,
                private readonly metafrenzyService: MetafrenzyService,) {
        this.id = this.route.snapshot.paramMap.get('id');
        this.authenticationService.currentUser.subscribe(x => this.currentUser = x);

        this.router.routeReuseStrategy.shouldReuseRoute = function(){
            return false;
        }

        if(this.currentUser && this.currentUser._id == this.id) {
            this.myProfil = true;
        }
        this.api.getUserQuizz(this.id).subscribe((resp: any) => {
            if(resp.user) {
                this.metafrenzyService.setAllTitleTags('MyQuizzy - Les quizz de ' + resp.user.username);
                this.metafrenzyService.setAllDescriptionTags('Viens répondre au quizz de ' + resp.user.username);
                this.user = resp.user;
                this.quizzs = resp.quizz;
                this.answers = resp.answers;
            } else {
                
            }
           
        }, err => {
          console.log(err);
        });
    }


    copyUrl(val) {
        let selBox = document.createElement('textarea');
        selBox.style.position = 'fixed';
        selBox.style.left = '0';
        selBox.style.top = '0';
        selBox.style.opacity = '0';
        selBox.value = val;
        document.body.appendChild(selBox);
        selBox.focus();
        selBox.select();
        document.execCommand('copy');
        document.body.removeChild(selBox);
        this.toastr.success('Lien du profil copié ')
    }

    getAvatar(id) {
        return environment.baseUrl + 'avatar/' + id + '.jpg';
    }
    ngOnInit() {
    }

    displayTab(tab) {
        this.tab = tab;
    }

    returnResult(answer) {
        const total = answer.questions.length;
        let good = 0;

        answer.questions.map(a => {
            if (a.answer.rep) {
                good++;
            }
        });

        return (100 * good / total).toFixed();
    }

}
