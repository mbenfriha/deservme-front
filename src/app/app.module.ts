import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';

import { ToastrModule } from 'ngx-toastr';
import { IconModule } from './share/component/icon.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MetafrenzyModule } from 'ngx-metafrenzy';

import { FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { CoreModule } from "./core/core.module";
import { NavModule } from "./core/component/nav/nav.module";
import {FooterComponent} from "./core/component/footer/footer.component";

@NgModule({
    declarations: [AppComponent, FooterComponent],
    imports: [
        CoreModule,
        BrowserModule.withServerTransition({ appId: 'deserveme' }),
        AppRoutingModule,
        HttpClientModule,
        FontAwesomeModule,
        ToastrModule.forRoot({
            positionClass: 'toast-top-full-width',
            preventDuplicates: true,
        }),
        BrowserAnimationsModule,
        MetafrenzyModule.forRoot(),
        ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
        IconModule,
        NavModule
    ],
    providers: [],
    bootstrap: [AppComponent, FooterComponent]
})
export class AppModule {
}
