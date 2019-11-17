import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NavComponent} from "./nav.component";
import {AppRoutingModule} from "../../../app-routing.module";
import {ModalRegisterModule} from "../../../share/component/modal-register/modal-register.module";
import {CoreModule} from "../../core.module";



@NgModule({
    declarations: [NavComponent],
    imports: [
        CommonModule,
        AppRoutingModule,
        ModalRegisterModule,
        CoreModule
    ],
    exports: [
        NavComponent
    ]
})
export class NavModule { }
