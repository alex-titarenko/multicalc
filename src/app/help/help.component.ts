import { Component, ElementRef, ViewEncapsulation } from '@angular/core';

import { AnalyticsService } from '../core/analytics/analytics.service';
import { BasePageComponent } from 'shared/base-page.component';
import { FeedbackOptionsComponent } from './feedback-options/feedback-options.component';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { SharingService } from 'ng-common';
import { appConfig } from 'app/core/configs/app.config';

@Component({
  selector: 'app-help',
  templateUrl: './help.component.html',
  styleUrls: ['./help.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HelpComponent extends BasePageComponent {
  constructor(
    elementRef: ElementRef,
    private sharingService: SharingService,
    private bottomSheet: MatBottomSheet,
    private analyticsService: AnalyticsService) {
    super(elementRef);
  }

  public share(): void {
    this.sharingService.shareUrl(appConfig.appUrl);
    this.analyticsService.trackEvent('app_share');
  }

  public sendFeedback(): void {
    this.bottomSheet.open(FeedbackOptionsComponent, {
      autoFocus: false,
      restoreFocus: false
    });
  }
}
