import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewQuizzComponent } from './view-quizz.component';
import {RouterModule} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {ShareButtonsModule} from "@ngx-share/buttons";
import {AnswersListComponent} from "../answers-list/answers-list.component";
import { MaterializeAccordionModule, MaterializeCollapsibleModule, MaterializeTabGroupModule } from 'materialize-angular';

import {CoreModule} from "../../../core/core.module";
import {ModalRegisterModule} from "../../../share/component/modal-register/modal-register.module";

@NgModule({
    declarations: [
        ViewQuizzComponent,
        AnswersListComponent,
    ],
    imports: [
        CommonModule,
        RouterModule.forChild([
            { path: '', component: ViewQuizzComponent }
        ]),
        FormsModule,
        ShareButtonsModule,
        MaterializeTabGroupModule,
        MaterializeCollapsibleModule,
        MaterializeAccordionModule,
        CoreModule,
        ModalRegisterModule
    ]
})
export class ViewQuizzModule { }
