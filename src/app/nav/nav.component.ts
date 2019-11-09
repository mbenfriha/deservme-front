import {Component, Input, OnInit, ElementRef} from '@angular/core';
import {User} from '../models/user';
import {ActivatedRoute, Router} from '@angular/router';

declare var jQuery: any;

import { environment } from '../../environments/environment';
import {StorageMap} from '@ngx-pwa/local-storage';


@Component({
    selector: 'app-nav',
    templateUrl: './nav.component.html',
    styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

    @Input() currentUser: User;
    @Input() currentRoute: String;
    constructor(private el: ElementRef,
                private route: Router,
                private storage: StorageMap) { }

    ngOnInit() {
        jQuery('.sidenav').sidenav();
    }

    getAvatar(id) {
        return environment.baseUrl + 'avatar/' + id + '.jpg';
    }

    disconnect() {
        localStorage.removeItem('user');

        window.location.href = environment.baseUrl + 'logout';
    }
}
