import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ModalRegisterComponent} from "./modal-register.component";



@NgModule({
  declarations: [ModalRegisterComponent],
  imports: [
    CommonModule
  ],
    exports: [ModalRegisterComponent]
})
export class ModalRegisterModule { }
