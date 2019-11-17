import {Component, OnDestroy, OnInit} from '@angular/core';
import {User} from "../../../models/user";
import {Quizz} from "../../../models/quizz";
import {Answer} from "../../../models/answer";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthenticationService} from "../../../core/authentication/authentication.service";
import {ToastrService} from "ngx-toastr";
import {MetafrenzyService} from "ngx-metafrenzy";
import {environment} from "../../../../environments/environment";
import {Subscription} from "rxjs";
import {LoaderService} from "../../../core/service/loader.service";
import {isNullOrUndefined} from "util";
import {UserService} from "../../service/user.service";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-view-profile',
  templateUrl: './view-profile.component.html',
  styleUrls: ['./view-profile.component.scss']
})
export class ViewProfileComponent implements OnInit, OnDestroy {

    id: string;
    user: User;
    notExist = false;
    quizzs: Quizz[];
    answers: Answer[];
    currentUser: User;
    myProfil: boolean;
    shortUrl = 'qzzy.in/';
    getUser: Subscription;

    constructor(private route: ActivatedRoute,
                private router: Router,
                private userService: UserService,
                private authenticationService: AuthenticationService,
                private toastr: ToastrService,
                private readonly metafrenzyService: MetafrenzyService,
                private loaderService: LoaderService,
                private readonly translate: TranslateService) {
        this.translate.setDefaultLang('en');
        this.translate.use(this.translate.getBrowserLang());

        this.loaderService.load.next(false);
        this.id = this.route.snapshot.paramMap.get('id');

        this.router.routeReuseStrategy.shouldReuseRoute = function(){
            return false;
        }

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
        this.loaderService.load.next(false);

        this.getUser = this.authenticationService.currentUser.subscribe(x => {
            this.currentUser = x;
            if(this.currentUser && this.currentUser._id == this.id) {
                this.myProfil = true;
            }
        });

        if(this.myProfil) {
            this.userService.getMyProfil().subscribe((resp: any) => {
                if(resp.user) {
                    this.metafrenzyService.setAllTitleTags('MyQuizzy - Les quizz de ' + resp.user.username);
                    this.metafrenzyService.setAllDescriptionTags('Viens répondre au quizz de ' + resp.user.username);
                    this.user = resp.user;
                    this.quizzs = resp.quizz;
                    this.answers = resp.answers;
                } else {
                    this.notExist = true;
                }

                this.loaderService.load.next(true);
                console.log('loaded');

            }, err => {
                this.notExist = true;
                this.loaderService.load.next(true);
            });
        } else {
            this.userService.getUserProfil(this.id).subscribe((resp: any) => {
                if(resp.user) {
                    this.metafrenzyService.setAllTitleTags('MyQuizzy - Les quizz de ' + resp.user.username);
                    this.metafrenzyService.setAllDescriptionTags('Viens répondre au quizz de ' + resp.user.username);
                    this.user = resp.user;
                    this.quizzs = resp.quizz;
                } else {
                    this.notExist = true;
                }
                this.loaderService.load.next(true);

            }, err => {
                this.notExist = true;
                this.loaderService.load.next(true);
            });
        }
    }

    returnResult(answer) {
        const total = answer.questions.filter(q => q.name).length;
        let good = 0;

        answer.questions.filter(q => q.name).map(a => {
            if (a.answer.rep) {
                good++;
            }
        });

        return (100 * good / total).toFixed();
    }

    ngOnDestroy() {
        if(!isNullOrUndefined(this.getUser)) {
            this.getUser.unsubscribe();
        }
    }
}
