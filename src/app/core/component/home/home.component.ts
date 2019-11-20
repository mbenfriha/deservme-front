import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MetafrenzyService } from 'ngx-metafrenzy';
import { ToastrService } from 'ngx-toastr';

import { environment } from '../../../../environments/environment';
import {AuthenticationService} from '../../authentication/authentication.service';
import {User} from '../../../models/user';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  modal = false;
  environment = environment;
  user: User;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private readonly metafrenzyService: MetafrenzyService,
              private toastr: ToastrService,
              private authenticationService: AuthenticationService) {

     // this.titleService.setTitle( 'MyQuizzy - Crée, joue et partage des tas de quizz');

      this.metafrenzyService.setAllTitleTags('MyQuizzy - Crée, joue et partage des tas de quizz');
      this.metafrenzyService.setAllDescriptionTags('Crée, participe et partage des quizz avec tes amis');
  }

  ngOnInit() {
      this.authenticationService.currentUser.subscribe(x => {
          if (x) {
              console.log(x);
              this.user = x;
              this.router.navigate(['/quizz/discover']);
          }
      });
  }

  openModal() {
          if(!this.user) {
              this.modal = true;
          } else {
              this.router.navigate(['/quizz/discover']);
          }
  }

  closeModal() {
    this.modal = false;
  }

}
