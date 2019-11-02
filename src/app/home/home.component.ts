import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MetafrenzyService } from 'ngx-metafrenzy';


import { environment } from '../../environments/environment';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  modal: boolean;
  environment = environment;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private readonly metafrenzyService: MetafrenzyService) {
    this.metafrenzyService.setTitle('Deserv.me - Crée ton quizz');

    this.metafrenzyService.setMetaTag('og:title', 'Deserv.me - Crée ton quizz');

    this.metafrenzyService.setLinkTag({
      rel: 'canonical',
      href: 'https://deserv.me'
    });
    this.metafrenzyService.setOpenGraph({
      title: 'Deserv.me - Crée ton quizz',
      description: 'Crée, répond et partagez des quizz',
      type: 'website',
      url: 'https://deserv.me',
      image: 'https://deserv.me/assets/images/white-logo.png',
      site_name: 'Deserv.me'
    });
  }

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
