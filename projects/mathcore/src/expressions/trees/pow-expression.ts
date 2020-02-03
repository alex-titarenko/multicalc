import { BinaryExpression } from './binary-expression';
import { AddExpression } from './add-expression';
import { SubExpression } from './sub-expression';
import { MultExpression } from './mult-expression';
import { DivExpression } from './div-expression';

export abstract class PowExpression<T> extends BinaryExpression<T> {
  private static readonly lowerPriorityOperators: Function[] = [
    SubExpression, AddExpression, MultExpression, DivExpression
  ];

  public toString() {
    const left = this.wrapWithParentheses(this.leftExpression, ...PowExpression.lowerPriorityOperators);
    const right = this.wrapWithParentheses(this.rightExpression, ...PowExpression.lowerPriorityOperators);

    return `${left}^${right}`;
  }
}
