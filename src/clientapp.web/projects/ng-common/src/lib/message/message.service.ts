import { Injectable, Component, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  constructor(private dialog: MatDialog) { }

  public showConfirmation(message: string, okText: string, cancelText: string, okAction: () => void) {
    const data: MessageData = {
      message: message,
      okText: okText,
      cancelText: cancelText,
      okAction: okAction
    };

    this.dialog.open(ConfirmationMessageDialogComponent, {
      width: 'auto',
      autoFocus: false,
      data: data
    });
  }
}

class MessageData {
  message: string;
  okText: string;
  cancelText: string;
  okAction: () => void;
}

@Component({
  template: `
<mat-dialog-content class="content">{{ data.message }}</mat-dialog-content>
<mat-dialog-actions class="actions" align="center">
  <button type="button" mat-button (click)="cancelAction()" >{{ data.cancelText }}</button>
  <button type="button" mat-button (click)="okAction()">{{ data.okText }}</button>
</mat-dialog-actions>`
})
export class ConfirmationMessageDialogComponent {
  constructor (
    private dialogRef: MatDialogRef<ConfirmationMessageDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: MessageData) { }

  public cancelAction() {
    this.dialogRef.close();
  }

  public okAction() {
    this.data.okAction();
    this.dialogRef.close();
  }
}
