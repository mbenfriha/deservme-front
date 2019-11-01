import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { environment } from '../../environments/environment';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  modal: boolean;
  environment = environment;

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params['id']) {
        this.router.navigate(['/register']);
      }
    });
  }

  openModal() {
    if (localStorage.getItem('user')) {
      this.router.navigate(['/register']);
    } else {
      this.modal = true;

    }
  }

  closeModal() {
    this.modal = false;
  }

}
