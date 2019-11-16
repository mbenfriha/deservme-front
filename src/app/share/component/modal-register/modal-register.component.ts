import {Component, Input, OnInit, OnChanges, Output, EventEmitter} from '@angular/core';

import { environment } from '../../../../environments/environment';


@Component({
    selector: 'app-modal-register',
    templateUrl: './modal-register.component.html',
    styleUrls: ['./modal-register.component.scss']
})
export class ModalRegisterComponent {

    @Input() modal: boolean;
    @Output() modalClose = new EventEmitter<any>();
    environment = environment;

    constructor() { }

    closeModal() {
        this.modal = false;
        this.modalClose.emit();
    }


}
