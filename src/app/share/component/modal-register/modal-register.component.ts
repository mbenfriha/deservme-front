import {Component, Input, OnInit, OnChanges, Output, EventEmitter} from '@angular/core';


import { environment } from '../../../../environments/environment';
import {TranslateService} from "@ngx-translate/core";


@Component({
    selector: 'app-modal-register',
    templateUrl: './modal-register.component.html',
    styleUrls: ['./modal-register.component.scss']
})
export class ModalRegisterComponent {

    @Input() modal: boolean;
    @Output() modalClose = new EventEmitter<any>();
    environment = environment;

    constructor(private readonly translate: TranslateService) {
        translate.setDefaultLang(translate.getBrowserLang()); }

    closeModal() {
        this.modal = false;
        this.modalClose.emit();
    }


}
