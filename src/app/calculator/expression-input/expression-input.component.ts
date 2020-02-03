import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Expression, TokenType } from '../shared/expression.model';
import { AnswerFormat } from '../shared/answer-format.model';

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

  public onKeyDown(event: KeyboardEvent): void {
    switch (event.key) {
      case 'ArrowLeft':
        this.moveCaretLeft();
        break;

      case 'ArrowRight':
        this.moveCaretRight();
        break;

      case 'Home':
        this.moveCaretToStart();
        break;

      case 'End':
        this.moveCaretToEnd();
        break;

      case 'Enter':
      case '=':
        this.evaluateExpr();
        break;

      case 'Backspace':
        this.backspace();
        break;

      case 'Delete':
        this.delete();
        break;

      default:
        if (this.isValidExpressionKey(event.key)) {
          this.insertToken(this.caretPosition, event.key);
        }
    }

    event.stopPropagation();

    if (event.key === 'Backspace') {
      event.preventDefault();
    }
  }

  public onMouseDown(event: MouseEvent) {
    const targetElement = <HTMLElement>event.target;

    if (targetElement.tagName === 'SPAN') {
      const elementWidth = targetElement.offsetWidth;
      const elementOffsetX = event.pageX - targetElement.offsetLeft;

      const nodes = <[HTMLElement]>Array.prototype.slice.call(targetElement.parentElement.children);
      const selectedIndex = nodes.indexOf(targetElement);
      this.caretPosition = this.expression.length - selectedIndex + (1 - Math.round(elementOffsetX / elementWidth));
    } else {
      this.caretPosition = this.expression.length;
    }
  }

  public onResizeComplete() {
    this.resizeComplete.emit();
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

  private isValidExpressionKey(key: string): boolean {
    if (key.length > 1) {
      return false;
    }

    if (key >= '0' && key <= '9') {
      return true;
    }

    if ((key >= 'a' && key <= 'z') || (key >= 'A' && key <= 'Z')) {
      return true;
    }

    if (this.isOperatorToken(key)) {
      return true;
    }

    switch (key) {
      case ',':
      case '.':
      case ';':
      case ':':
      case '(':
      case ')':
      case '[':
      case ']':
      case '#':
      case ' ':
        return true;

      default:
        return false;
    }
  }

  private isOperatorToken(token: string): boolean {
    switch (token) {
      case '*':
      case '/':
      case '+':
      case '-':
      case '%':
      case '^':
      case '√':
        return true;

      default:
        return false;
    }
  }

  private insertToken(position: number, token: string) {
    const tokenType = this.getTokenType(token);
    this.expression.splice(this.expression.length - position, 0, { value: token, type: tokenType });
    this.emitExpressionChange();
  }

  private insertExpression(position: number, expression: Expression) {
    this.expression.splice(this.expression.length - position, 0, ...expression);
    this.emitExpressionChange();
  }

  private getTokenType(token: string): TokenType {
    if (this.isOperatorToken(token)) {
      return TokenType.Operator;
    }

    return TokenType.Default;
  }

  private emitExpressionChange() {
    const expressionCopy = this.expression.slice(0);
    this.expressionChange.emit(expressionCopy);
  }
}
