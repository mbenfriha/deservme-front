import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatGridListModule} from '@angular/material/grid-list';
import { ToastrModule } from 'ngx-toastr';
import { IconModule } from './icon.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ShareButtonsModule } from '@ngx-share/buttons';
import { MetafrenzyModule } from 'ngx-metafrenzy';
import { JwtInterceptor, ErrorInterceptor } from './_helpers';

import { FontAwesomeModule} from '@fortawesome/angular-fontawesome';

import { MaterializeAccordionModule, MaterializeCollapsibleModule, MaterializeTabGroupModule } from 'materialize-angular';



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
import { AnswersListComponent } from './answers-list/answers-list.component';
import { NavComponent } from './nav/nav.component';
import { DiscoverComponent } from './discover/discover.component';
import { SingleQuizzListComponent } from './single-quizz-list/single-quizz-list.component';
import { NewQuizzComponent } from './new-quizz/new-quizz.component';
import { MyQuizzComponent } from './my-quizz/my-quizz.component';
import { ModalRegisterComponent } from './modal-register/modal-register.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import {UserProfilComponent} from './user-profil/user-profil.component';
import {SettingsComponent} from './settings/settings.component'

@NgModule({
    declarations: [
        AppComponent,
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
        AnswersListComponent,
        NewQuizzComponent,
        MyQuizzComponent,
        ModalRegisterComponent,
        UserProfilComponent,
        SettingsComponent
    ],
    imports: [
        BrowserModule.withServerTransition({ appId: 'deserveme' }),
        AppRoutingModule,
        HttpClientModule,
        FontAwesomeModule,
        FormsModule,
        MatIconModule,
        MatButtonModule,
        MatCardModule,
        MatGridListModule,
        ReactiveFormsModule,
        ShareButtonsModule,
        ToastrModule.forRoot({
            positionClass: 'toast-top-full-width',
            preventDuplicates: true,
        }),
        BrowserAnimationsModule,
        MetafrenzyModule.forRoot(),
        ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
        MaterializeAccordionModule,
        MaterializeCollapsibleModule,
        MaterializeTabGroupModule,
        IconModule
    ],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    ],
    bootstrap: [AppComponent, FooterComponent]
})
export class AppModule {
}
