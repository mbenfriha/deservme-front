import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {User} from '../models/user';
import {ActivatedRoute, Router} from '@angular/router';
import {ApiService} from '../services/api.service';
import {Quizz} from '../models/quizz';

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
              private router: Router) { }

  ngOnInit() {
    this.api.getCurrentUser().subscribe((v: User) => {
        localStorage.setItem('user', JSON.stringify(v));
      if (!v.username) {
        this.router.navigate(['/register']);
      } else {
        this.currentUser = v;
      }
    }, error => {
      if (error) {
          if (this.currentRoute !== 'quizz/:id' && this.currentRoute !== 'terms'
              && this.currentRoute !== 'privacy' && this.currentRoute !== 'contact'
              && this.currentRoute !== 'profil/:id') {
              this.router.navigate(['/']);

          }
      }
    });
  }

    ngOnChanges() {
        this.api.getCurrentUser().subscribe((v: User) => {
            if (!localStorage.getItem('user')) {
                localStorage.setItem('user', JSON.stringify(v));
            }
            if (!v.username) {
                this.router.navigate(['/register']);
            } else {
                this.currentUser = v;
            }
        }, error => {
            if (error) {
                if (this.currentRoute !== 'quizz/:id' && this.currentRoute !== 'terms'
                    && this.currentRoute !== 'privacy' && this.currentRoute !== 'contact'
                    && this.currentRoute !== 'profil/:id') {
                    console.log('noninonon')
                    this.router.navigate(['/']);
                }
            }
        });
    }

}
