import { Component, Inject } from '@angular/core';
import { MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { AnswerFormat } from '../shared/answer-format.model';
import { formatMathResult } from '../shared/math-result-helper';

type InstantResult = {
  value: any
  answerFormat: AnswerFormat
}

@Component({
  selector: 'app-calculator-instant-result-menu',
  template: `
<mat-nav-list>
  <a mat-list-item (click)="copyFormatted()">
    <span matListItemTitle>Copy (Formatted Value)</span>
  </a>

  <a mat-list-item (click)="copyRaw()">
    <span matListItemTitle>Copy (Raw Value)</span>
  </a>
</mat-nav-list>
`
})
export class InstantResultMenuComponent {
  protected result: InstantResult;

  constructor(
    private bottomSheetRef: MatBottomSheetRef<InstantResultMenuComponent>,
    @Inject(MAT_BOTTOM_SHEET_DATA) data: InstantResult
    ) {
    this.result = data;
  }

  public async copyFormatted() {
    await navigator.clipboard.writeText(formatMathResult(this.result.value, this.result.answerFormat, false));
    this.bottomSheetRef.dismiss();
  }

  public async copyRaw() {
    await navigator.clipboard.writeText(this.result.value.toString());
    this.bottomSheetRef.dismiss();
  }
}
