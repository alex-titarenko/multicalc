import { Expression } from './expression';
import { VariableExpression } from './variable-expression';

export abstract class UnaryExpression<T> extends Expression<T> {
  constructor(public subExpression: Expression<T>) {
    super();
  }

  public findVariableExpression(name: string, searchResult: { var: VariableExpression<T>, found: boolean }): void {
    if (!searchResult.found) {
      this.subExpression.findVariableExpression(name, searchResult);
    }
  }

  public findAllVariableExpressions(foundVariables: VariableExpression<T>[]): void {
    this.subExpression.findAllVariableExpressions(foundVariables);
  }

  public replaceChild(oldExpression: Expression<T>, newExpression: Expression<T>): void {
    if (this.subExpression === oldExpression) {
      this.subExpression = newExpression;
    } else {
      this.subExpression.replaceChild(oldExpression, newExpression);
    }
  }
}
