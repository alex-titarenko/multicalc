import { Expression } from './expression';
import { UnaryExpression } from './unary-expression';

export abstract class UnaryMinusExpression<T> extends UnaryExpression<T> {
  constructor(subExpression: Expression<T>) {
    super(subExpression);
  }

  public toString() {
    return '-' + this.subExpression.toString();
  }
}
