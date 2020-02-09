import { NgModule, Optional, SkipSelf, ErrorHandler } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { RouterModule, RouteReuseStrategy } from '@angular/router';
import { ServiceWorkerModule } from '@angular/service-worker';
import { NgcCookieConsentModule } from 'ngx-cookieconsent';
import { Angulartics2Module } from 'angulartics2';
import { MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/dialog';
import { MAT_TOOLTIP_DEFAULT_OPTIONS } from '@angular/material/tooltip';

import { MaterialModule } from 'shared/material.module';
import { NavComponent } from './nav/nav.component';
import { GlobalErrorHandler } from './global-error-handler';
import { CustomRouteReuseStrategy } from './custom-route-reuse-strategy';
import { cookieConsentConfig } from './configs/cookie-consent.config';
import { tooltipConfig } from './configs/tooltip.config';
import { angularticsConfig } from './configs/angulartics.config';
import { CustomHammerConfig } from './configs/hammerjs.config';
import { environment } from 'src/environments/environment';
import { dialogConfig } from './configs/dialog.config';
import { ExpressionEvaluatorService } from '../shared/expression-evaluator.service';

@NgModule({
  declarations: [
    NavComponent
  ],
  providers: [
    { provide: ErrorHandler, useClass: GlobalErrorHandler },
    { provide: RouteReuseStrategy, useClass: CustomRouteReuseStrategy },
    { provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: dialogConfig },
    { provide: MAT_TOOLTIP_DEFAULT_OPTIONS, useValue: tooltipConfig },
    { provide: HAMMER_GESTURE_CONFIG, useClass: CustomHammerConfig },
    { provide: ExpressionEvaluatorService, useClass: ExpressionEvaluatorService }
  ],
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule,
    NgcCookieConsentModule.forRoot(cookieConsentConfig),
    Angulartics2Module.forRoot(angularticsConfig),
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
  ],
  exports: [
    NavComponent
  ]
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    const moduleName = 'CoreModule';

    if (parentModule) {
      throw new Error(`${moduleName} has already been loaded. Import Core modules in the AppModule only.`);
    }
  }
}
