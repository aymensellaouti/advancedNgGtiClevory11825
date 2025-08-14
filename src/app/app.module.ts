import { NgModule, isDevMode } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { provideHttpClient, withInterceptorsFromDi } from "@angular/common/http";

import { ToastrModule } from "ngx-toastr";

import { AppComponent } from "./app.component";
import { FirstComponent } from "./components/first/first.component";
import { SecondComponent } from "./components/second.component";
import { ColorComponent } from "./components/color/color.component";
import { TwoComponent } from "./components/two/two.component";
import { CardProfilComponent } from "./components/card-profil/card-profil.component";
import { PereComponent } from "./components/pere/pere.component";
import { FilsComponent } from "./components/fils/fils.component";


import { NgstyleComponent } from "./directives/ngstyle/ngstyle.component";
import { MiniWordComponent } from "./directives/mini-word/mini-word.component";
import { NgclassComponent } from "./directives/ngclass/ngclass.component";

import { HighlightDirective } from "./directives/highlight.directive";
import { RainbowDirective } from "./directives/rainbow.directive";

import { Btc2usdPipe } from "./pipes/btc2usd.pipe";
import { AppRoutingModule } from "./app-routing.module";
import { NavbarComponent } from "./components/navbar/navbar.component";
import { FrontComponent } from "./templates/front/front.component";
import { AdminComponent } from "./templates/admin/admin.component";
import { NF404Component } from "./components/nf404/nf404.component";
import { TestFormComponent } from "./components/test-form/test-form.component";
import { LoginComponent } from "./auth/login/login.component";
import { TestObservableComponent } from "./rxjs/test-observable/test-observable.component";
import { TestHttpComponent } from "./components/test-http/test-http.component";
import { AuthInterceptorProvider } from "./auth/interceptors/auth.interceptor";
import { RhComponent } from "./optimizationPattern/rh/rh.component";
import { UserListComponent } from "./optimizationPattern/user-list/user-list.component";
import { ProductsComponent } from "./products/products.component";
import { ServiceWorkerModule } from "@angular/service-worker";
import { SliderComponent } from "./rxjs/slider/slider.component";
import { LoggerService } from "./services/logger.service";
import { Logger2Service } from "./services/logger2.service";
import { CvService } from "./cv/services/cv.service";
import { CONSTANTES } from "src/config/const.config";
import { FakeCvService } from "./cv/services/fake-cv.service";
import { LoggersInjectionToken } from "./injection tokens/logger.injection-token";
import { UUID } from "./injection tokens/uuid.injection-token";
import {v4 as uuidV4} from "uuid";
import { myCustomProvider } from "./providers/custom.provider";
import { FromOfComponent } from "./rxjs/from-of/from-of.component";
import { TtcComponent } from './signals/ttc/ttc.component';
import { InputSignalComponent } from "./signals/input-signal/input-signal.component";
import { IsEvenComponent } from "./signals/is-even/is-even.component";
import { PereCdComponent } from './cd/pere-cd/pere-cd.component';
import { FilsCdComponent } from './cd/fils-cd/fils-cd.component';
import { UserListElementsComponent } from './optimizationPattern/user-list-elements/user-list-elements.component';
import { FiboPipe } from './pipes/fibo.pipe';

@NgModule({
    // Components, Directives, Pipes
    // ELi lahna ma 3andou 7ad akher el 7a9 ideclarihom
    declarations: [AppComponent],
    bootstrap: [AppComponent], imports: [BrowserModule,
        FormsModule,
        BrowserAnimationsModule, // required animations module
        ToastrModule.forRoot(), // ToastrModule added
        AppRoutingModule,
        ReactiveFormsModule,
        ServiceWorkerModule.register('ngsw-worker.js', {
            enabled: !isDevMode(),
            // Register the ServiceWorker as soon as the application is stable
            // or after 30 seconds (whichever comes first).
            registrationStrategy: 'registerWhenStable:30000',
        }), FirstComponent,
        SecondComponent,
        ColorComponent,
        TwoComponent,
        PereComponent,
        FilsComponent,
        NgstyleComponent,
        MiniWordComponent,
        NgclassComponent,
        HighlightDirective,
        RainbowDirective,
        Btc2usdPipe,
        NavbarComponent,
        FrontComponent,
        AdminComponent,
        NF404Component,
        TestFormComponent,
        LoginComponent,
        TestObservableComponent,
        SliderComponent,
        TestHttpComponent,
        RhComponent,
        UserListComponent,
        ProductsComponent,
        FromOfComponent,
        TtcComponent,
        InputSignalComponent,
        IsEvenComponent,
        PereCdComponent,
        FilsCdComponent,
        UserListElementsComponent,
        FiboPipe], providers: [
        AuthInterceptorProvider,
        {
            provide: LoggersInjectionToken,
            useClass: LoggerService,
            multi: true,
        },
        {
            provide: LoggersInjectionToken,
            useClass: Logger2Service,
            multi: true,
        },
        {
            // esm el 7aja eli bech nwafarha
            provide: CvService,
            // chneya bech nwafer
            useClass: CONSTANTES.env == 'dev' ? FakeCvService : CvService,
        },
        {
            provide: UUID,
            useValue: uuidV4,
        },
        myCustomProvider,
        provideHttpClient(withInterceptorsFromDi()),
    ]
})
export class AppModule {}
