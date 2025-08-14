import { AuthInterceptorProvider } from './app/auth/interceptors/auth.interceptor';
import { LoggersInjectionToken } from './app/injection tokens/logger.injection-token';
import { LoggerService } from './app/services/logger.service';
import { Logger2Service } from './app/services/logger2.service';
import { CvService } from './app/cv/services/cv.service';
import { CONSTANTES } from 'src/config/const.config';
import { FakeCvService } from './app/cv/services/fake-cv.service';
import { UUID } from './app/injection tokens/uuid.injection-token';
import { v4 as uuidV4 } from 'uuid';
import { myCustomProvider } from './app/providers/custom.provider';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { provideAnimations } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { appRoutes } from './app/app-routing.module';
import { ServiceWorkerModule } from '@angular/service-worker';
import { isDevMode, importProvidersFrom } from '@angular/core';
import { AppComponent } from './app/app.component';
import { provideRouter, withPreloading } from '@angular/router';
import { CustomPreloadingStrategy } from './app/Preloading Strategy/custom.preloading-strategy';


bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(
      BrowserModule,
      FormsModule, // required animations module
      ToastrModule.forRoot(), // ToastrModule added
      ReactiveFormsModule,
      ServiceWorkerModule.register('ngsw-worker.js', {
        enabled: !isDevMode(),
        // Register the ServiceWorker as soon as the application is stable
        // or after 30 seconds (whichever comes first).
        registrationStrategy: 'registerWhenStable:30000',
      })
    ),
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
    provideAnimations(),
    provideRouter(appRoutes, withPreloading(CustomPreloadingStrategy)),
  ],
}).catch((err) => console.error(err));
