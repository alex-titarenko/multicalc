import { Component, Inject } from '@angular/core';
import { Expression } from '../shared/expression.model';
import { MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { AnswerFormat } from '../shared/answer-format.model';
import { formatMathResult } from '../shared/math-result-helper';
import { ExpressionHelper } from '../shared/expression-helper';

type ExpressionMenuData = {
  expression: Expression | any
  answerFormat: AnswerFormat
  onPaste: (expression: Expression) => void
}

@Component({
  selector: 'app-calculator-expression-menu',
  template: `
<mat-nav-list>
  <a mat-list-item (click)="copyExpression()">
    <span matListItemTitle>Copy (Whole Expression)</span>
  </a>

  <a mat-list-item (click)="pasteIntoPosition()">
    <span matListItemTitle>Paste</span>
  </a>
</mat-nav-list>
`
})
export class ExpressionMenuComponent {
  constructor(
    private bottomSheetRef: MatBottomSheetRef<ExpressionMenuComponent>,
    @Inject(MAT_BOTTOM_SHEET_DATA) private data: ExpressionMenuData
  ) {}

  protected async copyExpression() {
    const exprString = Array.isArray(this.data.expression) ?
      this.data.expression.map(x => x.value).join('') :
      formatMathResult(this.data.expression, this.data.answerFormat, false);
    navigator.clipboard.writeText(exprString);
    this.bottomSheetRef.dismiss();
  }

  protected async pasteIntoPosition() {
    const text = await navigator.clipboard.readText();
    if (ExpressionHelper.isValidExpressionString(text)) {
      this.data.onPaste(ExpressionHelper.stringToExpression(text));
    }

    this.bottomSheetRef.dismiss();
  }
}
