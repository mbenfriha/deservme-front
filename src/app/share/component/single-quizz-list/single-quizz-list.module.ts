import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SingleQuizzListComponent} from "./single-quizz-list.component";
import {RouterModule} from "@angular/router";



@NgModule({
    declarations: [SingleQuizzListComponent],
    imports: [
        CommonModule,
        RouterModule
    ],
    exports: [SingleQuizzListComponent]
})
export class SingleQuizzListModule { }
