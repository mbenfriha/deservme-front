import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ModalRegisterComponent} from "./modal-register.component";
import {CoreModule} from "../../../core/core.module";



@NgModule({
  declarations: [ModalRegisterComponent],
  imports: [
      CommonModule,
      CoreModule
  ],
    exports: [ModalRegisterComponent]
})
export class ModalRegisterModule { }
