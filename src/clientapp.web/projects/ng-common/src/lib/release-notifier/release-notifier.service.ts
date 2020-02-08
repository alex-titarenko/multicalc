import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class ReleaseNotifierService {
  private static readonly VER_STORAGE_KEY = 'app_version';
  private static readonly NOTIFICATION_DELAY = 2000;
  private static readonly NOTIFICATION_DURATION = 5000;

  constructor(
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  public notify(version: string, releaseNotesRoute: string): boolean {
    const currentVersion = localStorage.getItem(ReleaseNotifierService.VER_STORAGE_KEY);
    localStorage.setItem(ReleaseNotifierService.VER_STORAGE_KEY, version);

    if (currentVersion !== null && currentVersion !== version) {
      const message = `Web Application has been updated to version ${version}`;
      const actionLabel = 'Release Notes';

      setTimeout(() => {
        const snackBarRef = this.snackBar.open(message, actionLabel, {
          duration: ReleaseNotifierService.NOTIFICATION_DURATION
        });
        snackBarRef.onAction().subscribe(() => {
          this.router.navigate([releaseNotesRoute]);
        });
      }, ReleaseNotifierService.NOTIFICATION_DELAY);

      return true;
    }

    return false;
  }
}
