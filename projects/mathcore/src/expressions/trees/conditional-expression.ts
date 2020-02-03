import { Expression } from './expression';

export abstract class ConditionalExpression<T> extends Expression<T> {
  public condition: Expression<T>;

  public ifTrue: Expression<T>;
  public ifFalse: Expression<T>;
}
