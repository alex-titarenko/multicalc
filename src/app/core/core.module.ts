import { NgModule, Optional, SkipSelf, ErrorHandler } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, RouteReuseStrategy } from '@angular/router';
import { ServiceWorkerModule } from '@angular/service-worker';
import { HammerModule } from '@angular/platform-browser';
import { MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/dialog';
import { MAT_TOOLTIP_DEFAULT_OPTIONS } from '@angular/material/tooltip';

import { MaterialModule } from 'shared/material.module';
import { NavComponent } from './nav/nav.component';
import { GlobalErrorHandler } from './global-error-handler';
import { CustomRouteReuseStrategy } from './custom-route-reuse-strategy';
import { tooltipConfig } from './configs/tooltip.config';
import { environment } from 'src/environments/environment';
import { dialogConfig } from './configs/dialog.config';
import { ExpressionEvaluatorService } from '../shared/expression-evaluator.service';
import { ConsentText } from './cookie-consent/consent-text.component';

@NgModule({
  declarations: [
    NavComponent,
    ConsentText
  ],
  providers: [
    { provide: ErrorHandler, useClass: GlobalErrorHandler },
    { provide: RouteReuseStrategy, useClass: CustomRouteReuseStrategy },
    { provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: dialogConfig },
    { provide: MAT_TOOLTIP_DEFAULT_OPTIONS, useValue: tooltipConfig },
    { provide: ExpressionEvaluatorService, useClass: ExpressionEvaluatorService }
  ],
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule,
    HammerModule,
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
