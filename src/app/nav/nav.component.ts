import {Component, Input, OnInit, ElementRef} from '@angular/core';
import {User} from '../models/user';
import { ActivatedRoute } from '@angular/router';
declare var jQuery: any;

import { environment } from '../../environments/environment';


@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  currentRoute: string;
  environment = environment;

  @Input() currentUser: User;
  constructor(private el: ElementRef,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.currentRoute = this.route.snapshot.url[0].path;
    jQuery(this.el.nativeElement).find('.sidenav').sidenav();
  }

  disconnect() {
    localStorage.removeItem('user');
    window.location.href = this.environment.baseUrl + 'logout';
  }

}
