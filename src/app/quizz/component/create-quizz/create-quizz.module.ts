import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateQuizzComponent } from './create-quizz.component';
import {RouterModule} from "@angular/router";
import { FormsModule } from '@angular/forms';
import {AuthGuard} from "../../../core/authentication/guard/auth.guard";
import {UsernameGuard} from "../../../core/authentication/guard/username.guard";



@NgModule({
    declarations: [CreateQuizzComponent],
    imports: [
        CommonModule,
        RouterModule.forChild([
            { path: '', component: CreateQuizzComponent, canActivate: [AuthGuard, UsernameGuard] }
        ]),
        FormsModule
    ],
    exports: [RouterModule]
})
export class CreateQuizzModule { }
