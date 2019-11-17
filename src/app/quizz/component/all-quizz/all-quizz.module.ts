import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AllQuizzComponent} from "./all-quizz.component";
import {RouterModule} from "@angular/router";
import {AuthGuard} from "../../../core/authentication/guard/auth.guard";
import {UsernameGuard} from "../../../core/authentication/guard/username.guard";
import {SingleQuizzListModule} from "../../../share/component/single-quizz-list/single-quizz-list.module";
import {CoreModule} from "../../../core/core.module";
import {TranslateModule} from "@ngx-translate/core";

@NgModule({
  declarations: [AllQuizzComponent],
  imports: [
    CommonModule,
      RouterModule.forChild([
          { path: '', component: AllQuizzComponent, canActivate: [AuthGuard, UsernameGuard] }
      ]),
      SingleQuizzListModule,
      CoreModule,
      TranslateModule
  ]
})
export class AllQuizzModule { }
