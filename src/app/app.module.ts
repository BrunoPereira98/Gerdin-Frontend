import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EffectsModule, EffectsRootModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { NgxSpinnerModule } from 'ngx-spinner';

import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpInterceptorProvider } from './shared/providers/httpInterceptorProvider.provider';
import { ConfigService } from './shared/services/config.service';
import { SharedModule } from './shared/shared.module';
import { InterceptorService } from './shared/providers/InterceptorService.povider';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    NgxSpinnerModule.forRoot(),
    StoreModule.forRoot({}),
    EffectsRootModule,
    EffectsModule.forRoot(),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
    }),
    SharedModule,
  ],
  exports: [NgxSpinnerModule],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpInterceptorProvider,
      multi: true,
    },
    { provide: HTTP_INTERCEPTORS,
      useClass: InterceptorService,
      multi: true },
    {
      provide: APP_INITIALIZER,
      multi: true,
      deps: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return () => {
          return configService.loadInObject();
        };
      },
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
