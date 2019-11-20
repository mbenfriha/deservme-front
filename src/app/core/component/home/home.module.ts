import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HomeComponent} from "./home.component";
import {RouterModule} from "@angular/router";
import { ModalRegisterModule } from "../../../share/component/modal-register/modal-register.module";
import {CoreModule} from "../../core.module";
import {MetafrenzyModule} from "ngx-metafrenzy";

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
      RouterModule.forChild([
          { path: '', component: HomeComponent }
      ]),
      ModalRegisterModule,
      CoreModule,
      MetafrenzyModule

  ]
})
export class HomeModule { }
