import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './home/home.component';
import {TermsComponent} from './terms/terms.component';
import {PrivacyComponent} from './privacy/privacy.component';
import {ContactComponent} from './contact/contact.component';
import {RegisterComponent} from './register/register.component';
import {ProfilComponent} from './profil/profil.component';
import {DiscoverComponent} from './discover/discover.component';
import {CreateQuizzComponent} from './create-quizz/create-quizz.component';
import {NewQuizzComponent} from './new-quizz/new-quizz.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'terms', component: TermsComponent },
  { path: 'privacy', component: PrivacyComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profil', component: ProfilComponent},
  { path: 'discover', component: DiscoverComponent},
  { path: 'createQuizz', component: NewQuizzComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
