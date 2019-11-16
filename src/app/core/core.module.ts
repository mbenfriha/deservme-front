import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {JwtInterceptor} from "./interceptor/jwt.interceptor";
import {ErrorInterceptor} from "./interceptor/error.interceptor";
import {AuthGuard} from "./authentication/guard/auth.guard";
import { CookieModule } from 'ngx-cookie';
import {UsernameGuard} from "./authentication/guard/username.guard";
import {RouterModule} from "@angular/router";
import {LoaderService} from "./service/loader.service";

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        CookieModule.forRoot(),
        RouterModule
    ],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
        AuthGuard,
        UsernameGuard,
        LoaderService
    ],
    exports: []
})
export class CoreModule { }
