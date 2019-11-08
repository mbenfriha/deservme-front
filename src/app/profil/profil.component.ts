import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {User} from '../models/user';
import {ActivatedRoute, Router} from '@angular/router';
import {ApiService} from '../services/api.service';
import {Quizz} from '../models/quizz';
import {StorageMap} from '@ngx-pwa/local-storage';

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
              private router: Router,
              private storage: StorageMap) { }

  ngOnInit() {
    this.api.getCurrentUser().subscribe((v: User) => {
        this.storage.set('user', v).subscribe(() => {})

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
              this.storage.clear().subscribe(() => {})

          }
      }
    });
  }

    ngOnChanges() {
        this.api.getCurrentUser().subscribe((v: User) => {
            this.storage.get('ID').subscribe((data: any) => {
                if(data == null){
                    this.storage.set('user', v).subscribe(() => {})
                }
            }, () => {});
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
                    this.storage.clear().subscribe(() => {})
                }
            }
        });
    }

}
