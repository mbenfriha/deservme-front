import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AllQuizzComponent} from "./all-quizz.component";
import {RouterModule} from "@angular/router";
import {AuthGuard} from "../../../core/authentication/guard/auth.guard";
import {UsernameGuard} from "../../../core/authentication/guard/username.guard";
import {SingleQuizzListComponent} from "../../../share/component/single-quizz-list/single-quizz-list.component";
import {SingleQuizzListModule} from "../../../share/component/single-quizz-list/single-quizz-list.module";

@NgModule({
  declarations: [AllQuizzComponent],
  imports: [
    CommonModule,
      RouterModule.forChild([
          { path: '', component: AllQuizzComponent, canActivate: [AuthGuard, UsernameGuard] }
      ]),
      SingleQuizzListModule
  ]
})
export class AllQuizzModule { }
