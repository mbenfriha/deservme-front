import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from "@angular/router";
import {QuizzService} from "./service/quizz.service";
import {AuthGuard} from "../core/authentication/guard/auth.guard";
import {UsernameGuard} from "../core/authentication/guard/username.guard";
import {TranslateModule} from "@ngx-translate/core";



@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        RouterModule.forChild([
            { path: 'create', loadChildren: () => import('./component/create-quizz/create-quizz.module').then(value => value.CreateQuizzModule)},
            { path: 'discover', loadChildren: () => import('./component/all-quizz/all-quizz.module').then(value => value.AllQuizzModule)},
            { path: ':id', loadChildren: () => import('./component/view-quizz/view-quizz.module').then(value => value.ViewQuizzModule)},
        ]),
        TranslateModule
    ],
    exports: [RouterModule],
    providers: [QuizzService],
})
export class QuizzModule { }