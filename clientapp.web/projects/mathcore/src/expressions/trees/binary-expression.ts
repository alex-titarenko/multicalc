import { Expression } from './expression';
import { VariableExpression } from './variable-expression';

export abstract class BinaryExpression<T> extends Expression<T> {
  constructor(
    public leftExpression?: Expression<T>,
    public rightExpression?: Expression<T>
  ) {
    super();
  }

  public findVariableExpression(name: string, searchResult: { var: VariableExpression<T>, found: boolean }): void {
    if (!searchResult.found) {
        this.leftExpression.findVariableExpression(name, searchResult);
        this.rightExpression.findVariableExpression(name, searchResult);
    }
  }

  public findAllVariableExpressions(foundVariables: VariableExpression<T>[]): void {
    this.leftExpression.findAllVariableExpressions(foundVariables);
    this.rightExpression.findAllVariableExpressions(foundVariables);
  }

  public replaceChild(oldExpression: Expression<T>, newExpression: Expression<T>): void {
    if (this.leftExpression === oldExpression) {
      this.leftExpression = newExpression;
    } else {
      this.leftExpression.replaceChild(oldExpression, newExpression);
    }

    if (this.rightExpression === oldExpression) {
      this.rightExpression = newExpression;
    } else {
      this.rightExpression.replaceChild(oldExpression, newExpression);
    }
  }
}
