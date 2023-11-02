import { Injectable, EventEmitter } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class AppInstallerService {
  public get canInstall() { return this._canInstall; }
  public appInstalled = new EventEmitter();

  private _canInstall = false;
  private installPromptEvent: any = null;

  constructor(private snackBar: MatSnackBar) {
    window.addEventListener('beforeinstallprompt', (event) => {
      this.installPromptEvent = event;
      this._canInstall = true;
    });

    window.addEventListener('appinstalled', () => {
      this.appInstalled.emit();
    });

    // iPhone handler
    const isSafariNonStandaloneMode = (<any>window.navigator).standalone === false;
    if (isSafariNonStandaloneMode) {
      this._canInstall = true;
    }
  }

  public install(): void {
    if (this.canInstall) {
      if (this.installPromptEvent !== null) {
        this.installPromptEvent.prompt();

        this.installPromptEvent.userChoice.then((choice) => {
          // Clear the saved prompt since it can't be used again
          this._canInstall = false;
          this.installPromptEvent = null;
        });
      } else {
        this.snackBar.open(
          'Install this web app to your device: tap share button, and then "Add to Home Screen"', '',
          { duration: 8000, });
      }
    }
  }
}
