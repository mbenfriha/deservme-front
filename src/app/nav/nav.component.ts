import {Component, Input, OnInit, ElementRef} from '@angular/core';
import {User} from '../models/user';
import {ActivatedRoute, Router} from '@angular/router';


declare var jQuery: any;

import { environment } from '../../environments/environment';


@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  environment = environment;

  @Input() currentUser: User;
  @Input() currentRoute: String;
  constructor(private el: ElementRef,
              private route: Router) { }

  ngOnInit() {
    console.log(this.route.url);
  /*  if (this.route.snapshot && this.route.snapshot.url[0]) {
      this.currentRoute = this.route.snapshot.url[0].path;
    } else {
      console.log('pas de lien', this.route.snapshot);
    }*/
    jQuery('.sidenav').sidenav();

  }

  disconnect() {
    localStorage.removeItem('user');
    window.location.href = this.environment.baseUrl + 'logout';
  }

}
