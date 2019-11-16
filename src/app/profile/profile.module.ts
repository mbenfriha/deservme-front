import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from "@angular/router";
import {UsernameGuard} from "../core/authentication/guard/username.guard";
import {AuthGuard} from "../core/authentication/guard/auth.guard";
import {UserService} from "./service/user.service";



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
      RouterModule.forChild([
          { path: 'init', loadChildren: () => import('./component/init-profile/init-profile.module').then(value => value.InitProfileModule), canActivate: [AuthGuard]},
          { path: ':id', loadChildren: () => import('./component/view-profile/view-profile.module').then(value => value.ViewProfileModule), canActivate: [UsernameGuard]},
      ])
  ],
    providers: [UserService]
})
export class ProfileModule { }
