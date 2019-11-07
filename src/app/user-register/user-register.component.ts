import { Component, OnInit } from '@angular/core';
import {User, UserRegister} from '../models/user';
import { ApiService } from '../services/api.service';
import { Router, ActivatedRoute } from '@angular/router';
import { StorageMap } from '@ngx-pwa/local-storage';

import { AuthService, FacebookLoginProvider, SocialUser } from 'angularx-social-login';
import {environment} from 'src/environments/environment';


@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.scss']
})
export class UserRegisterComponent implements OnInit {

  data: UserRegister;
  id: number;
  currentUser: User;
  step = 1;

  constructor(
    public apiService: ApiService,
    public router: Router,
    private  activatedRoute: ActivatedRoute,
    private storage: StorageMap
  ) {
    this.data = new UserRegister();

    this.activatedRoute.queryParams.subscribe(params => {
      this.id = params['id'];
      console.log(params);
      if (this.id != null) {
          this.storage.set('ID', this.id).subscribe(() => {})

      } else {
            this.storage.get('ID').subscribe((data: any) => {
              if(data != null)
                this.id = data;
            });
      }
    });
  }

  ngOnInit() {
    this.apiService.getCurrentUser().subscribe(resp => {
      this.currentUser = resp;
      console.log(this.currentUser);
    });
  }

  logout() {
      this.storage.delete('user').subscribe(() => {});
      window.location.href = environment.baseUrl + 'logout';
  }

  submitForm() {
    this.apiService.createUser(this.data).subscribe((response) => {
      console.log(response);
    });
  }
}
