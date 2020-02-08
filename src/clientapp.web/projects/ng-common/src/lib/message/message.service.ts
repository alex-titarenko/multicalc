import { Injectable, Component, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

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
      panelClass: '',
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
<div mat-dialog-content class="content">{{ data.message }}</div>
<div mat-dialog-actions class="actions" align="middle">
  <button type="button" mat-button (click)="cancelAction()" >{{ data.cancelText }}</button>
  <button type="button" mat-button (click)="okAction()">{{ data.okText }}</button>
</div>`,
  styles: [
    '.content { margin-bottom: 20px }',
    '.actions { margin-bottom: -10px; }',
  ]
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
