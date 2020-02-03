import { BinaryExpression } from './binary-expression';

export abstract class SubExpression<T> extends BinaryExpression<T> {
  public toString() {
    return `${this.leftExpression}-${this.rightExpression}`;
  }
}
