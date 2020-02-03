import { NgcCookieConsentConfig } from 'ngx-cookieconsent';
import { environment } from '../../../environments/environment';

export const cookieConsentConfig: NgcCookieConsentConfig = {
  cookie: {
    domain: environment.cookieDomain
  },
  theme: 'classic',
  type: 'info',
  content: {
    message: `By using our Web Application,
    you acknowledge that you have read and understand our
    <a href="/help/privacy-policy">Privacy Policy</a> and <a href="/help/terms">Terms of Use</a>.`,
    dismiss: 'Got it',
    link: null,
  }
};
