import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import {ActivatedRoute, Router} from '@angular/router';
import {User} from '../models/user';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {debounceTime} from 'rxjs/operators';
import {Subject} from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  private register: boolean;
  name = {length: false, unique: false, alpha: false};
  subject: Subject<any> = new Subject();
  step = 1;


  constructor(private api: ApiService,
              private route: ActivatedRoute,
              private router: Router,
              private formBuilder: FormBuilder) { }

  ngOnInit() {
    // create username form
    this.registerForm = this.formBuilder.group({
      username: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
    });

    // create subject for debouncetime, anti spam backend
    this.subject
      .pipe(debounceTime(500))
      .subscribe(() => {
        this.checkUsername();
        }
      );
    // check if user is connected and have username ?
    this.api.getCurrentUser().subscribe((v: User) => {
      localStorage.setItem('user', JSON.stringify(v));
      if (v.username) {
        this.router.navigate(['/profil']);
      } else {
        this.register = true;
      }
    }, error => {
      if (error) {
        this.router.navigate(['/']);
      }
    });
  }

  // get form fields
  get f() { return this.registerForm.controls; }

  onSubmit() {

    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }

    // display form values on success
  /*  this.api.updateUser({username: this.registerForm.value.username}).subscribe((v: User) => {
      this.step = 2;
    }, (error) => {
      console.log('une erreur est survenue');
    });*/

    this.step = 2;
  }

  checkUsername() {
    // if username length > 3
    if (this.registerForm.value.username.length >= 3 ) {
      this.name.length = true;

      this.api.getCurrentUsername(this.registerForm.value.username).subscribe(v => {
        this.name.unique = false;
      }, error => {
        this.name.unique = true;
      });
    } else {
      this.name.length = false;
      this.name.unique = false;
      this.name.alpha = false;
    }

    if (RegExp('^[a-zA-Z0-9]*$').test(this.registerForm.value.username)) {
      this.name.alpha = true;
    } else {
      this.name.alpha = false;
    }
  }

  usernameChange() {
    this.subject.next();
  }

}
