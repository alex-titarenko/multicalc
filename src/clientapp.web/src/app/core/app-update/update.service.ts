import { Injectable } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class UpdateService {
  constructor(swUpdate: SwUpdate, private snackbar: MatSnackBar) {
    swUpdate.available.subscribe(event => {
      const snack = this.snackbar.open('Update Available', 'Reload', {
        duration: 6000
      });

      snack
        .onAction()
        .subscribe(() => {
          swUpdate.activateUpdate().then(() => window.location.reload());
        });
    });
  }
}
