import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {InitProfileComponent} from "./init-profile.component";
import {RouterModule} from "@angular/router";
import {CoreModule} from "../../../core/core.module";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';




@NgModule({
  declarations: [InitProfileComponent],
  imports: [
    CommonModule,
      RouterModule.forChild([
          { path: '', component: InitProfileComponent }
      ]),
      CoreModule,
      FormsModule,
      ReactiveFormsModule
  ]
})
export class InitProfileModule { }
