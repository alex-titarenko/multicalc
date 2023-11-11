import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SwUpdate } from '@angular/service-worker';

@Injectable({
  providedIn: 'root'
})
export class UpdateService {
  constructor(swUpdate: SwUpdate, private snackbar: MatSnackBar) {
    swUpdate.versionUpdates.subscribe(event => {
      if (event.type === 'VERSION_READY') {
        const snack = this.snackbar.open('Update Available', 'Reload', {
          duration: 6000
        });

        snack
          .onAction()
          .subscribe(() => {
            swUpdate.activateUpdate().then(() => window.location.reload());
          });
      }
    });
  }
}
