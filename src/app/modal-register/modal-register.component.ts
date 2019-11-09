import {Component, Input, OnInit, OnChanges, Output, EventEmitter} from '@angular/core';
import { faFacebook, faTwitter  } from '@fortawesome/free-brands-svg-icons';


import { environment } from '../../environments/environment';


@Component({
    selector: 'app-modal-register',
    templateUrl: './modal-register.component.html',
    styleUrls: ['./modal-register.component.scss']
})
export class ModalRegisterComponent implements OnInit, OnChanges {

    @Input() modal: boolean;
    @Output() modalClose = new EventEmitter<any>();
    environment = environment;

    constructor() { }

    ngOnInit() {
    }
    ngOnChanges() {
    }
    closeModal() {
        this.modal = false;
        this.modalClose.emit();
    }


}
