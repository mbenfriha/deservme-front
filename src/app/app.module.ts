import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HttpClient } from '@angular/common/http';

import { AppComponent } from './app.component';

import { ToastrModule } from 'ngx-toastr';
import { IconModule } from './share/component/icon.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MetafrenzyModule } from 'ngx-metafrenzy';

import { FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import {CoreModule} from "./core/core.module";
import { NavModule } from "./core/component/nav/nav.module";
import {FooterComponent} from "./core/component/footer/footer.component";
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {TranslateHttpLoader} from "@ngx-translate/http-loader";

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
        NavModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient]
            },
            isolate : false
        }),

    ],
    providers: [],
    bootstrap: [AppComponent, FooterComponent],
    exports: []
})
export class AppModule { }


export function HttpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
