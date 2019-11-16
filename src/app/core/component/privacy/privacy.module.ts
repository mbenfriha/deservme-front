import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {PrivacyComponent} from "./privacy.component";
import {RouterModule} from "@angular/router";



@NgModule({
  declarations: [PrivacyComponent],
  imports: [
    CommonModule,
      RouterModule.forChild([
          { path: '', component: PrivacyComponent }
      ]),
  ],
    exports: [PrivacyComponent]
})
export class PrivacyModule { }
