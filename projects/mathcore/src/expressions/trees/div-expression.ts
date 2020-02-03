import { BinaryExpression } from './binary-expression';
import { AddExpression } from './add-expression';
import { SubExpression } from './sub-expression';

export abstract class DivExpression<T> extends BinaryExpression<T> {
  private static readonly lowerPriorityOperators: Function[] = [
    SubExpression, AddExpression
  ];

  public errorOnDivideByZero: boolean = false;

  public toString() {
    const left = this.wrapWithParentheses(this.leftExpression, ...DivExpression.lowerPriorityOperators);
    const right = this.wrapWithParentheses(this.rightExpression, ...DivExpression.lowerPriorityOperators);

    return `${left}/${right}`;
  }
}
