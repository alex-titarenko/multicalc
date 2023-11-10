import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Expression, TokenType } from '../shared/expression.model';
import { AnswerFormat } from '../shared/answer-format.model';
import { ExpressionHelper } from '../shared/expression-helper';
import { formatMathResult } from '../shared/math-result-helper';

@Component({
  selector: 'app-expression-input',
  templateUrl: './expression-input.component.html',
  styleUrls: ['./expression-input.component.scss']
})
export class ExpressionInputComponent implements OnInit {
  private _answer: any = null;

  public caretPosition: number = 0;
  public expression: Expression = [];

  public get answer() { return this._answer; }

  @Input()
  public set answer(value: any) {
    this._answer = value;

    if (value !== null) {
      this.expression.length = 0;
      this.caretPosition = 0;
    }
  }

  @Input()
  public answerFormat: AnswerFormat;

  @Output()
  public evaluate = new EventEmitter<string>();

  @Output()
  public expressionChange = new EventEmitter<Expression>();

  @Output()
  public resizeComplete = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {
  }

  public input(token: string) {
    this.insertToken(this.caretPosition, token);
  }

  public inputExpression(expression: Expression) {
    this.insertExpression(this.caretPosition, expression);
  }

  public backspace() {
    if (this.expression.length > 0 && this.caretPosition < this.expression.length) {
      this.expression.splice(this.expression.length - this.caretPosition - 1, 1);
      this.emitExpressionChange();
      return true;
    }

    this.emitExpressionChange();
    return false;
  }

  public delete() {
    if (this.expression.length > 0 && this.caretPosition > 0) {
      this.expression.splice(this.expression.length - this.caretPosition, 1);
      this.caretPosition--;
      this.emitExpressionChange();
      return true;
    }

    this.emitExpressionChange();
    return false;
  }

  public clear() {
    this.expression.length = 0;
    this.caretPosition = 0;
    this.emitExpressionChange();
  }

  public getPlainExpression(): string {
    return this.expression.map(x => x.value).join('');
  }

  public async onKeyDown(event: KeyboardEvent): Promise<void> {
    var handled = false;

    switch (event.key) {
      case 'ArrowLeft':
        this.moveCaretLeft();
        handled = true;
        break;

      case 'ArrowRight':
        this.moveCaretRight();
        handled = true;
        break;

      case 'Home':
        this.moveCaretToStart();
        handled = true;
        break;

      case 'End':
        this.moveCaretToEnd();
        handled = true;
        break;

      case 'Enter':
      case '=':
        this.evaluateExpr();
        handled = true;
        break;

      case 'Backspace':
        this.backspace();
        handled = true;
        break;

      case 'Delete':
        this.delete();
        handled = true;
        break;

      default:
        if (event.metaKey || event.ctrlKey) {
          if (event.key === 'c') {
            await this.copyExpression();
          } else if (event.key === 'v') {
            await this.pasteExpression();
          }
          handled = true;
        } else if (ExpressionHelper.isValidExpressionCharacter(event.key)) {
          this.insertToken(this.caretPosition, event.key);
          handled = true;
        }
    }

    event.stopPropagation();

    if (handled) {
      event.preventDefault();
    }
  }

  public onMouseDown(event: MouseEvent) {
    this.updateCaretPosition(<HTMLElement>event.target, event.pageX);
  }

  public OnTouchStart(event: TouchEvent) {
    this.updateCaretPosition(<HTMLElement>event.target, event.touches.item(0).pageX);
  }

  public onResizeComplete() {
    this.resizeComplete.emit();
  }

  private updateCaretPosition(targetElement: HTMLElement, pageX: number) {
    if (targetElement.tagName === 'SPAN') {
      const elementWidth = targetElement.offsetWidth;
      const elementOffsetX = pageX - targetElement.offsetLeft;

      const nodes = <[HTMLElement]>Array.prototype.slice.call(targetElement.parentElement.children);
      const selectedIndex = nodes.indexOf(targetElement);
      this.caretPosition = Math.min(
        this.expression.length,
        this.expression.length - selectedIndex + (1 - Math.round(elementOffsetX / elementWidth))
      );
    } else {
      this.caretPosition = this.expression.length;
    }
  }

  private moveCaretLeft(): boolean {
    if (this.caretPosition < this.expression.length) {
      this.caretPosition++;
      return true;
    }
    return false;
  }

  private moveCaretRight(): boolean {
    if (this.caretPosition > 0) {
      this.caretPosition--;
      return true;
    }
    return false;
  }

  private moveCaretToStart() {
    this.caretPosition = this.expression.length;
  }

  private moveCaretToEnd() {
    this.caretPosition = 0;
  }

  private evaluateExpr() {
    this.evaluate.emit();
  }

  private insertToken(position: number, token: string) {
    const tokenType = ExpressionHelper.getTokenType(token);
    this.expression.splice(this.expression.length - position, 0, { value: token, type: tokenType });
    this.emitExpressionChange();
  }

  private insertExpression(position: number, expression: Expression) {
    this.expression.splice(this.expression.length - position, 0, ...expression);
    this.emitExpressionChange();
  }

  private emitExpressionChange() {
    const expressionCopy = this.expression.slice(0);
    this.expressionChange.emit(expressionCopy);
  }

  private async copyExpression() {
    const copyStr = this.answer ?
      formatMathResult(this.answer, this.answerFormat, false) :
      ExpressionHelper.expressionToString(this.expression);

    await navigator.clipboard.writeText(copyStr);
  }

  private async pasteExpression() {
    const text = await navigator.clipboard.readText();
    if (ExpressionHelper.isValidExpressionString(text)) {
      this.inputExpression(ExpressionHelper.stringToExpression(text));
    }
  }
}
