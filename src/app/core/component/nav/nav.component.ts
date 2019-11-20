import {Component, Input, OnInit, ElementRef} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthenticationService} from "../../authentication/authentication.service";
import {User} from 'src/app/models/user';
import {environment} from 'src/environments/environment';

declare var jQuery: any;



@Component({
    selector: 'app-nav',
    templateUrl: './nav.component.html',
    styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

    @Input() currentUser: User;
    @Input() currentRoute: String;
    environment = environment;
    modal = false;

    constructor(private el: ElementRef,
                private route: Router,
                private auth: AuthenticationService) {
    }

    ngOnInit() {
        jQuery('.sidenav').sidenav();
    }

    getAvatar(id) {
        return environment.baseUrl + 'avatar/' + id + '.jpg';
    }

    disconnect() {
        this.auth.logout();
        this.route.navigate(['/'])
       // window.location.href = environment.baseUrl + 'logout';
    }

    closeModal() {
        this.modal = false;
    }

    openModal() {
        this.modal = true;
    }
}