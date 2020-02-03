import { Component, ElementRef, ViewEncapsulation } from '@angular/core';
import { MatBottomSheet } from '@angular/material';
import { Angulartics2 } from 'angulartics2';

import { SharingService } from 'ng-common';

import { BasePageComponent } from 'shared/base-page.component';
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
    private angulartics: Angulartics2) {
    super(elementRef);
  }

  public share(): void {
    const url = window.location.origin;
    this.sharingService.shareUrl(url);

    this.angulartics.eventTrack.next({
      action: 'share',
      properties: {
        category: 'engagement'
      }
    });
  }

  public sendFeedback(): void {
    this.bottomSheet.open(FeedbackOptionsComponent, {
      autoFocus: false,
      restoreFocus: false
    });
  }
}
