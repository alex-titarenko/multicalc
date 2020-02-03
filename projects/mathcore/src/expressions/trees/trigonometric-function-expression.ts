import { Expression } from './expression';
import { UnaryExpression } from './unary-expression';
import { AngleMode } from 'mathcore/convert';

export abstract class TrigonometricFunctionExpression<T> extends UnaryExpression<T> {
  public angleMode: AngleMode = AngleMode.Radian;

  constructor(subExpression: Expression<T>) {
    super(subExpression);
  }
}
