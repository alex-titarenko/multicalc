import { ErrorHandler, Injectable, Injector } from '@angular/core';
import { AnalyticsService } from './analytics/analytics.service';

@Injectable()
export class GlobalErrorHandler extends ErrorHandler {
  constructor(private injector: Injector) {
    super();
  }

  handleError(error: any): void {
    super.handleError(error);

    const analyticsService = this.injector.get(AnalyticsService);

    if (analyticsService) {
      analyticsService.trackException(error.stack, true);
    }
  }
}
