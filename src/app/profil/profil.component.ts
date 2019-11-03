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
    console.log(this.nav);
    this.api.getCurrentUser().subscribe((v: User) => {
      if (!localStorage.getItem('user')) {
        localStorage.setItem('user', JSON.stringify(v));
        console.log('ajouter');
      }
      if (!v.username) {
        this.router.navigate(['/register']);
      } else {
        this.currentUser = v;
      }
    }, error => {
      if (error) {
        this.router.navigate(['/']);
      }
    });
  }

    ngOnChanges() {
        console.log(this.nav);
        this.api.getCurrentUser().subscribe((v: User) => {
            if (!localStorage.getItem('user')) {
                localStorage.setItem('user', JSON.stringify(v));
                console.log('ajouter');
            }
            if (!v.username) {
                this.router.navigate(['/register']);
            } else {
                this.currentUser = v;
            }
        }, error => {
            if (error) {
                this.router.navigate(['/']);
            }
        });
    }

}
