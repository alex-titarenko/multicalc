import { BinaryExpression } from './binary-expression';
import { AddExpression } from './add-expression';
import { SubExpression } from './sub-expression';

export abstract class PercentExpression<T> extends BinaryExpression<T> {
  private static readonly lowerPriorityOperators: Function[] = [
    SubExpression, AddExpression
  ];

  public toString() {
    const left = this.wrapWithParentheses(this.leftExpression, ...PercentExpression.lowerPriorityOperators);
    const right = this.wrapWithParentheses(this.rightExpression, ...PercentExpression.lowerPriorityOperators);

    return `${left}%${right}`;
  }
}
