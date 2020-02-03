import { Expression } from './expression';
import { VariableExpression } from './variable-expression';

export class ScalarExpression<T> extends Expression<T> {
  constructor(public readonly scalar: T) {
    super();
  }

  public evaluate(): T {
    return this.scalar;
  }

  public findVariableExpression(name: string, searchResult: { var: VariableExpression<T>, found: boolean }): void { }

  public findAllVariableExpressions(foundVariables: VariableExpression<T>[]): void { }

  public replaceChild(oldExpression: Expression<T>, newExpression: Expression<T>): void { }

  public toString() {
    return this.scalar.toString();
  }
}
