import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HomeComponent} from "./home.component";
import {RouterModule} from "@angular/router";
import {ModalRegisterModule} from "../../../share/component/modal-register/modal-register.module";

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
      RouterModule.forChild([
          { path: '', component: HomeComponent }
      ]),
      ModalRegisterModule
  ]
})
export class HomeModule { }
