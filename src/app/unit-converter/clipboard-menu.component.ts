import { Component, Inject } from '@angular/core';
import { MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef } from '@angular/material/bottom-sheet';

type ClipboardMenuData = {
  value: string
  onPaste?: (value: string) => void
}

function isNumber(text: string) {
  return /^[-]?([0-9]+)(\.[0-9]+)?$/.test(text);
}

function sanitizeNumericValue(value: string) : string | undefined {
  return isNumber(value) ? value : undefined;
}

@Component({
  selector: 'app-converter-clipboard-menu',
  template: `
<mat-nav-list>
  <a mat-list-item (click)="copy()">
    <span matListItemTitle>Copy</span>
  </a>

  <a *ngIf="data.onPaste !== undefined" mat-list-item (click)="paste()">
    <span matListItemTitle>Paste</span>
  </a>
</mat-nav-list>
`
})
export class ClipboardMenuComponent {
  protected data: ClipboardMenuData;

  constructor(
    private bottomSheetRef: MatBottomSheetRef<ClipboardMenuComponent>,
    @Inject(MAT_BOTTOM_SHEET_DATA) data: ClipboardMenuData) {
    this.data = data;
  }

  public async copy() {
    await navigator.clipboard.writeText(this.data.value);
    this.bottomSheetRef.dismiss();
  }

  public async paste() {
    const text = await navigator.clipboard.readText();
    const pasteValue = sanitizeNumericValue(text);

    if (this.data.onPaste && pasteValue !== undefined) {
      this.data.onPaste(pasteValue);
    }
    this.bottomSheetRef.dismiss();
  }
}
