import { BinaryExpression } from './binary-expression';

export abstract class AddExpression<T> extends BinaryExpression<T> {
  public toString() {
    return `${this.leftExpression}+${this.rightExpression}`;
  }
}
