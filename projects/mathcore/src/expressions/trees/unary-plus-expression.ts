import { Expression } from './expression';
import { UnaryExpression } from './unary-expression';

export class UnaryPlusExpression<T> extends UnaryExpression<T> {
  constructor(subExpression: Expression<T>) {
    super(subExpression);
  }

  public evaluate(): T {
    return this.subExpression.evaluate();
  }
}
