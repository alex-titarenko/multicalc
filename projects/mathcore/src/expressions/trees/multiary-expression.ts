import { Expression } from './expression';
import { VariableExpression } from './variable-expression';

export abstract class MultiaryExpression<T> extends Expression<T> {
  public expressions: Expression<T>[];

  constructor(...expressions: Expression<T>[]) {
    super();

    this.expressions = expressions;
  }

  public findVariableExpression(name: string, searchResult: { var: VariableExpression<T>, found: boolean }): void {
    if (!searchResult.found) {
      this.expressions.forEach(subExpr => {
        subExpr.findVariableExpression(name, searchResult);
      });
    }
  }

  public findAllVariableExpressions(foundVariables: VariableExpression<T>[]): void {
    this.expressions.forEach(subExpr => {
      subExpr.findAllVariableExpressions(foundVariables);
    });
  }

  public replaceChild(oldExpression: Expression<T>, newExpression: Expression<T>): void {
    for (let i = 0; i < this.expressions.length; i++) {
      if (this.expressions[i] === oldExpression) {
        this.expressions[i] = newExpression;
      } else {
        this.expressions[i].replaceChild(oldExpression, newExpression);
      }
    }
  }
}
