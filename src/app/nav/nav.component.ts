import {Component, Input, OnInit, ElementRef} from '@angular/core';
import {User} from '../models/user';
declare var jQuery: any;



@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  @Input() currentUser: User;
  constructor(private el: ElementRef) { }

  ngOnInit() {
    console.log(this.currentUser);
    jQuery(this.el.nativeElement).find('.sidenav').sidenav();

  }

}
