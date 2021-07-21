import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AnalyticsService {
  public trackEvent(eventName: string, parameters?: {}) {
    this.gtag('event', eventName, parameters);
  }

  public trackException(message: string, fatal: boolean = false) {
    this.trackEvent('exception', {
      'description': message,
      'fatal': fatal
    });
  }

  public setUserProperties(properties: {}) {
    this.gtag('set', 'user_properties', properties);
  }

  private gtag(command: string, ...parameters: any[]) {
    const gtagObj: any = (window as any).gtag;
    gtagObj && gtagObj(command, ...parameters);
  }
}
