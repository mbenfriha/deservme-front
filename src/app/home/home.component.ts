import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MetafrenzyService } from 'ngx-metafrenzy';
import { ToastrService } from 'ngx-toastr';

import { environment } from '../../environments/environment';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  modal = false;
  environment = environment;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private readonly metafrenzyService: MetafrenzyService,
              private toastr: ToastrService) {

      this.metafrenzyService.setAllTitleTags('MyQuizzy - Crée, joue et partage des tas de quizz');
      this.metafrenzyService.setAllDescriptionTags('Crée, participe et partage des quizz avec tes amis');

  }

  ngOnInit() {
      if (localStorage.getItem('user')) {
          this.router.navigate(['/discover']);
      }
    this.route.queryParams.subscribe(params => {
      if (params['id']) {
        this.router.navigate(['/register']);
      }
      if (params['banned']) {
          localStorage.removeItem('user');
          this.toastr.error('Vous avez été bannis');
      }
    });
  }

  openModal() {
    console.log(this.modal);
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
