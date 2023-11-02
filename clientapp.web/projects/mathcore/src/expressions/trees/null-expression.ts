import { Expression } from './expression';
import { VariableExpression } from './variable-expression';

export class NullExpression<T> extends Expression<T> {
  public evaluate(): T {
    throw new Error('Null reference');
  }

  public findVariableExpression(name: string, searchResult: { var: VariableExpression<T>, found: boolean }): void { }

  public findAllVariableExpressions(foundVariables: VariableExpression<T>[]): void { }

  public replaceChild(oldExpression: Expression<T>, newExpression: Expression<T>): void { }

  public toString() {
    return 'NULL';
  }
}
