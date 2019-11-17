import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Subject, Subscription} from "rxjs";
import {Quizz} from "../../../models/quizz";
import {environment} from "../../../../environments/environment";
import {ActivatedRoute, Router} from "@angular/router";
import {debounceTime, take} from "rxjs/operators";
import {User} from "../../../models/user";
import {AuthenticationService} from "../../../core/authentication/authentication.service";
import {isNullOrUndefined} from "util";
import {UserService} from "../../service/user.service";

@Component({
  selector: 'app-init-profile',
  templateUrl: './init-profile.component.html',
  styleUrls: ['./init-profile.component.scss']
})
export class InitProfileComponent implements OnInit, OnDestroy {

    registerForm: FormGroup;
    private register: boolean;
    name = {length: false, unique: false, alpha: false};
    subject: Subject<any> = new Subject();
    step = 1;
    quizz: Quizz;
    shortUrl = environment.shortUrl;
    user: User;
    private update: Subscription;

    constructor(private userService: UserService,
                private route: ActivatedRoute,
                private router: Router,
                private formBuilder: FormBuilder,
                private authenticationService: AuthenticationService) {


        this.authenticationService.currentUser.subscribe(x => {
           this.user = x;

           if(!isNullOrUndefined(x.username)) {
               this.goToProfile();
           }
        });
    }

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
    }

    // get form fields
    get f() { return this.registerForm.controls; }

    onSubmit() {

        // stop here if form is invalid
        if (this.registerForm.invalid) {
            return;
        } else {
            // display form values on success
            this.update = this.userService.updateUser({username: this.registerForm.value.username}).pipe(take(1)).subscribe((user: User) => {
                if (user) {
                    var currentUser = user;
                    currentUser.token = this.user.token;
                    this.authenticationService.setUser(currentUser);
                    return;
                } else {

                }

            });
        }
        console.log('submit');
    }

    checkUsername() {
        // if username length > 3
        if (this.registerForm.value.username.length >= 3 ) {
            this.name.length = true;

            this.userService.getCurrentUsername(this.registerForm.value.username).pipe(take(1)).subscribe(v => {
                this.name.unique = false;
            }, error => {
                this.name.unique = true;
            });
        } else {
            this.name.length = false;
            this.name.unique = false;
            this.name.alpha = false;
        }

        if (RegExp('^[A-Za-zÀ-ÖØ-öø-ÿ0-9._-]*$').test(this.registerForm.value.username)) {
            this.name.alpha = true;
        } else {
            this.name.alpha = false;
        }
    }

    usernameChange() {
        this.subject.next();
    }

    checkQuizzCreate(quizz) {
        if (quizz) {
            this.quizz = quizz;
            this.step = 3;
            console.log(quizz._id, 'nouveau quizzz');
        } else {
            console.log('erreur');
        }
    }

    goToProfile() {
        this.router.navigate(['/quizz/discover']);
    }

    ngOnDestroy() {}
}
