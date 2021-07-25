import { Component } from '@angular/core';
import { MatSnackBarRef } from '@angular/material/snack-bar';

@Component({
  selector: 'consent-text',
  templateUrl: 'consent-text.component.html'
})
export class ConsentText {
  constructor(private snackBarRef: MatSnackBarRef<ConsentText>) {}

  close(){
    this.snackBarRef.dismiss();
  }
}
