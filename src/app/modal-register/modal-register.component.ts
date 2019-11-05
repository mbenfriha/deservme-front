import {Component, Input, OnInit, OnChanges} from '@angular/core';

import { environment } from '../../environments/environment';


@Component({
    selector: 'app-modal-register',
    templateUrl: './modal-register.component.html',
    styleUrls: ['./modal-register.component.scss']
})
export class ModalRegisterComponent implements OnInit, OnChanges {

    @Input() modal: boolean;
    environment = environment;

    constructor() { }

    ngOnInit() {
    }
    ngOnChanges()
    {
      console.log('caca');
    }
    closeModal() {
        this.modal = false;
    }


}
