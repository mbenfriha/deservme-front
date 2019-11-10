import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {User} from '../models/user';
import {ActivatedRoute, Router} from '@angular/router';
import {ApiService} from '../services/api.service';
import {Quizz} from '../models/quizz';
import {AuthenticationService} from '../services/authentication.service';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.scss']
})
export class ProfilComponent implements OnInit, OnChanges {

  @Input() nav: Boolean = false;
  @Input() currentRoute: string;

  currentUser: User;

  constructor(private api: ApiService,
              private route: ActivatedRoute,
              private router: Router,
              private authenticationService: AuthenticationService,) {
      console.log('profil');
      this.authenticationService.currentUser.subscribe(x => this.currentUser = x);

  }

  ngOnInit() {

  }

    ngOnChanges() {

    }

}
