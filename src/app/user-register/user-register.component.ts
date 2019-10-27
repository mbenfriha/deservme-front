import { Component, OnInit } from '@angular/core';
import {User, UserRegister} from '../models/user';
import { ApiService } from '../services/api.service';
import { Router, ActivatedRoute } from '@angular/router';
import {CookieService} from 'ngx-cookie-service';

import { AuthService, FacebookLoginProvider, SocialUser } from 'angularx-social-login';


@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.scss']
})
export class UserRegisterComponent implements OnInit {

  data: UserRegister;
  id: number;
  email: any;
  private cookieValue: string;
  login: boolean;
  currentUser: User;

  constructor(
    public apiService: ApiService,
    public router: Router,
    private  activatedRoute: ActivatedRoute,
    private cookieService: CookieService
  ) {
    this.data = new UserRegister();

    this.activatedRoute.queryParams.subscribe(params => {
      this.id = params['id'];
      console.log(params);
      if (this.id != null) {
        localStorage.setItem('ID', JSON.stringify(this.id));
      } else {
        this.id = JSON.parse(localStorage.getItem('ID'));
      }
    });
  }

  ngOnInit() {
    this.apiService.getItem().subscribe(resp => {
      this.currentUser = resp;
      console.log(this.currentUser);
    });
  }

  logout() {
    localStorage.clear();
    window.location.href = 'http://localhost:3000/logout';
  }

  submitForm() {
    this.apiService.createItem(this.data).subscribe((response) => {
      console.log(response);
    });
  }
}
