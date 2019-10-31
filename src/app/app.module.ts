import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule } from '@angular/common/http';
import { UserRegisterComponent } from './user-register/user-register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatGridListModule} from '@angular/material/grid-list';



import { CookieService } from 'ngx-cookie-service';


import {
  MatIconModule,
  MatButtonModule,
  MatCardModule } from '@angular/material';
import { HomeComponent } from './home/home.component';
import { TermsComponent } from './terms/terms.component';
import { PrivacyComponent } from './privacy/privacy.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { ContactComponent } from './contact/contact.component';
import { RegisterComponent } from './register/register.component';
import { ProfilComponent } from './profil/profil.component';
import { CreateQuizzComponent } from './create-quizz/create-quizz.component';
import { AnswerQuizzComponent } from './answer-quizz/answer-quizz.component';
import { NavComponent } from './nav/nav.component';
import { DiscoverComponent } from './discover/discover.component';
import { SingleQuizzListComponent } from './single-quizz-list/single-quizz-list.component';
import { NewQuizzComponent } from './new-quizz/new-quizz.component';


@NgModule({
  declarations: [
    AppComponent,
    UserRegisterComponent,
    HomeComponent,
    TermsComponent,
    PrivacyComponent,
    HeaderComponent,
    FooterComponent,
    ContactComponent,
    RegisterComponent,
    ProfilComponent,
    CreateQuizzComponent,
    AnswerQuizzComponent,
    NavComponent,
    DiscoverComponent,
    SingleQuizzListComponent,
    NewQuizzComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatGridListModule,
    ReactiveFormsModule
  ],
  providers: [CookieService],
  bootstrap: [AppComponent, FooterComponent]
})
export class AppModule { }
