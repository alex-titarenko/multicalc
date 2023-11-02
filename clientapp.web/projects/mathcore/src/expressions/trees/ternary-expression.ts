import { Expression } from './expression';
import { VariableExpression } from './variable-expression';

export abstract class TernaryExpression<T> extends Expression<T> {
  constructor(
    public firstExpression: Expression<T>,
    public secondExpression: Expression<T>,
    public thirdExpression: Expression<T>) {
    super();
  }

  public findVariableExpression(name: string, searchResult: { var: VariableExpression<T>, found: boolean }): void {
    if (!searchResult.found) {
      this.firstExpression.findVariableExpression(name, searchResult);
      this.secondExpression.findVariableExpression(name, searchResult);
      this.thirdExpression.findVariableExpression(name, searchResult);
    }
  }

  public findAllVariableExpressions(foundVariables: VariableExpression<T>[]): void {
    this.firstExpression.findAllVariableExpressions(foundVariables);
    this.secondExpression.findAllVariableExpressions(foundVariables);
    this.thirdExpression.findAllVariableExpressions(foundVariables);
  }

  public replaceChild(oldExpression: Expression<T>, newExpression: Expression<T>): void {
    if (this.firstExpression === oldExpression) {
      this.firstExpression = newExpression;
    } else {
      this.firstExpression.replaceChild(oldExpression, newExpression);
    }

    if (this.secondExpression === oldExpression) {
      this.secondExpression = newExpression;
    } else {
      this.secondExpression.replaceChild(oldExpression, newExpression);
    }

    if (this.thirdExpression === oldExpression) {
      this.thirdExpression = newExpression;
    } else {
      this.thirdExpression.replaceChild(oldExpression, newExpression);
    }
  }
}
