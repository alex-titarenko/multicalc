import { BinaryExpression } from './binary-expression';
import { AddExpression } from './add-expression';
import { SubExpression } from './sub-expression';

export abstract class MultExpression<T> extends BinaryExpression<T> {
  private static readonly lowerPriorityOperators: Function[] = [
    SubExpression, AddExpression
  ];

  public toString() {
    const left = this.wrapWithParentheses(this.leftExpression, ...MultExpression.lowerPriorityOperators);
    const right = this.wrapWithParentheses(this.rightExpression, ...MultExpression.lowerPriorityOperators);

    return `${left}*${right}`;
  }
}
