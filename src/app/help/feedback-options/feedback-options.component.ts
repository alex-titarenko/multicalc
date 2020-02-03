import { Component, OnInit } from '@angular/core';
import { MatBottomSheetRef } from '@angular/material';
import { appConfig } from 'app/core/configs/app.config';

interface FeedbackOption {
  url: string;
  text: string;
  newWindow: boolean;
}

@Component({
  selector: 'app-feedback-options',
  templateUrl: './feedback-options.component.html',
  styleUrls: ['./feedback-options.component.scss']
})
export class FeedbackOptionsComponent implements OnInit {
  public feedbackOptions: FeedbackOption[];

  constructor(private bottomSheetRef: MatBottomSheetRef<FeedbackOptionsComponent>) { }

  public clickLink(): void {
    this.bottomSheetRef.dismiss();
  }

  public ngOnInit() {
    const feedbackSubject = `${appConfig.name} ${appConfig.version} Feedback`;
    const feedbackBody = `[Please compose your feedback]`;
    const feedbackEmailLink = this.composeEmailLink(appConfig.feedbackEmail, feedbackSubject, feedbackBody);

    const newFeatureSubject = `${appConfig.name} ${appConfig.version} Suggest Feature`;
    const newFeatureBody = `[Please describe a feature which you would like to see in our application]`;
    const newFeatureEmailLink = this.composeEmailLink(appConfig.feedbackEmail, newFeatureSubject, newFeatureBody);

    const issueSubject = `${appConfig.name} ${appConfig.version} Issue`;
    const issueBody = `[Please add details about your issue]`;
    const issueEmailLink = this.composeEmailLink(appConfig.supportEmail, issueSubject, issueBody);

    this.feedbackOptions = [
      { text: 'Give Feedback', url: feedbackEmailLink, newWindow: false },
      { text: 'Suggest a Feature', url: newFeatureEmailLink, newWindow: false },
      { text: 'Report an Issue', url: issueEmailLink, newWindow: false },
      { text: 'Follow on Facebook', url: appConfig.facebookLink, newWindow: true },
      { text: 'Follow on Twitter', url: appConfig.twitterLink, newWindow: true },
      { text: 'Follow on Instagram', url: appConfig.instagramLink, newWindow: true }
    ];
  }

  private composeEmailLink(to: string, subject: string, body: string): string {
    return `mailto:${to}?subject=${subject}&body=${body}${this.composeDebugInfo()}`;
  }

  private composeDebugInfo(): string {
    const props = [
      `User Agent: ${ navigator.userAgent }`,
      `Platform: ${ navigator.platform }`,
      `Browser Language: ${ navigator.language }`,
      `Screen Size: ${ screen.width }x${ screen.height }`,
    ];

    const propsString = props.join('%0D%0A');

    // tslint:disable-next-line:max-line-length
    return `%0D%0A%0D%0A--------------------------------%0D%0A${propsString}`;
  }
}
