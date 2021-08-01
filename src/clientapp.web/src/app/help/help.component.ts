import { Component, ElementRef, OnInit, ViewEncapsulation } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';

import { SharingService } from 'ng-common';

import { BasePageComponent } from 'shared/base-page.component';
import { AnalyticsService } from '../core/analytics/analytics.service';
import { removeLoader } from '../core/loader/loader.helper';
import { FeedbackOptionsComponent } from './feedback-options/feedback-options.component';

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

  public ngAfterViewInit() {
    removeLoader();
  }

  public share(): void {
    const url = window.location.origin;
    this.sharingService.shareUrl(url);

    this.analyticsService.trackEvent('app_share');
  }

  public sendFeedback(): void {
    this.bottomSheet.open(FeedbackOptionsComponent, {
      autoFocus: false,
      restoreFocus: false
    });
  }
}
