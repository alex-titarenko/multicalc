import { Expression } from './expression';
import { VariableExpression } from './variable-expression';

export abstract class ConstantExpression<T> extends Expression<T> {
  public abstract get name(): string;

  public findVariableExpression(name: string, searchResult: { var: VariableExpression<T>, found: boolean }): void { }

  public findAllVariableExpressions(foundVariables: VariableExpression<T>[]): void { }

  public replaceChild(oldExpression: Expression<T>, newExpression: Expression<T>): void { }

  public toString() {
    return this.name;
  }
}
