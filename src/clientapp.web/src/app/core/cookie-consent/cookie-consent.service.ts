import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConsentText } from './consent-text.component';

@Injectable({
  providedIn: 'root'
})
export class CookieConsentService {
  private static readonly CookieConsentStatusStorageKey = 'cookieconsent_status'

  constructor(private snackbar: MatSnackBar) {
    const consentKey = localStorage.getItem(CookieConsentService.CookieConsentStatusStorageKey);
    if (consentKey) {
      return;
    }

    const snack = this.snackbar.openFromComponent(ConsentText, {});


    snack
      .afterDismissed()
      .subscribe(() => {
        localStorage.setItem(CookieConsentService.CookieConsentStatusStorageKey, 'dismiss');
      });
  }
}
