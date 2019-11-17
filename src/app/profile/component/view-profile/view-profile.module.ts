import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewProfileComponent } from './view-profile.component';
import {RouterModule} from "@angular/router";
import {CoreModule} from "../../../core/core.module";
import {MaterializeAccordionModule, MaterializeCollapsibleModule, MaterializeTabGroupModule} from "materialize-angular";
import {SingleQuizzListModule} from "../../../share/component/single-quizz-list/single-quizz-list.module";
import {FormsModule} from "@angular/forms";


@NgModule({
  declarations: [ViewProfileComponent],
  imports: [
    CommonModule,
      RouterModule.forChild([
          { path: '', component: ViewProfileComponent }
      ]),
      CoreModule,
      MaterializeTabGroupModule,
      MaterializeCollapsibleModule,
      MaterializeAccordionModule,
      SingleQuizzListModule,
      FormsModule
  ]
})
export class ViewProfileModule { }
