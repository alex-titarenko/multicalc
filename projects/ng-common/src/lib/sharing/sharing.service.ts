import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SharingService {
  constructor(private snackBar: MatSnackBar) {
  }

  public async shareUrl(url: string): Promise<void> {
    if (navigator.share) {
      navigator.share({ url: url });
      return;
    }

    await navigator.clipboard.writeText(url);
    this.snackBar.open('Message has been copied to clipboard', 'Dismiss', {
      duration: 3000
    });
  }
}
