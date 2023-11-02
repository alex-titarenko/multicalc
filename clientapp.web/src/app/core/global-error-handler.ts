import { ErrorHandler, Injectable, Injector } from '@angular/core';
import { AnalyticsService } from './analytics/analytics.service';

@Injectable()
export class GlobalErrorHandler extends ErrorHandler {
  constructor(private readonly analyticsService: AnalyticsService) {
    super();
  }

  handleError(error: any): void {
    super.handleError(error);
    this.analyticsService.trackException(error.stack, true);
  }
}
