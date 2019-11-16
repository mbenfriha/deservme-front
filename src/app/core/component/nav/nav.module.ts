import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NavComponent} from "./nav.component";
import {AppRoutingModule} from "../../../app-routing.module";
import {ModalRegisterModule} from "../../../share/component/modal-register/modal-register.module";



@NgModule({
    declarations: [NavComponent],
    imports: [
        CommonModule,
        AppRoutingModule,
        ModalRegisterModule

    ],
    exports: [
        NavComponent
    ]
})
export class NavModule { }
