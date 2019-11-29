import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {TermsComponent} from './core/component/terms/terms.component';
import {PrivacyComponent} from './core/component/privacy/privacy.component';
import {ContactComponent} from './core/component/contact/contact.component';
import {UsernameGuard} from "./core/authentication/guard/username.guard";

const routes: Routes = [
    { path: '',         loadChildren: () => import('./core/component/home/home.module').then(value => value.HomeModule)},
    { path: 'terms',    loadChildren: () => import('./core/component/terms/terms.module').then(value => value.TermsModule)},
    { path: 'privacy',  loadChildren: () => import('./core/component/privacy/privacy.module').then(value => value.PrivacyModule)},
    { path: 'contact',  loadChildren: () => import('./core/component/contact/contact.module').then(value => value.ContactModule)},
    { path: 'quizz',    loadChildren: () => import('./quizz/quizz.module').then(value => value.QuizzModule), canActivate: [UsernameGuard]},
    { path: 'profile',  loadChildren: () => import('./profile/profile.module').then(value => value.ProfileModule)},
    { path: 'profil',  loadChildren: () => import('./profile/profile.module').then(value => value.ProfileModule)},
    { path: '**',       redirectTo: '' }

];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
