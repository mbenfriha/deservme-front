import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SingleQuizzListComponent} from "./single-quizz-list.component";
import {RouterModule} from "@angular/router";
import {CoreModule} from "../../../core/core.module";



@NgModule({
    declarations: [SingleQuizzListComponent],
    imports: [
        CommonModule,
        RouterModule,
        CoreModule
    ],
    exports: [SingleQuizzListComponent]
})
export class SingleQuizzListModule { }
