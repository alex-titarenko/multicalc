import { Evaluator } from '../evaluator';
import { NullExpression } from './null-expression';
import { VariableExpression } from './variable-expression';

/**
 * Provides the base class from which the classes that represent expression
 * tree nodes are derived. This is an abstract class.
 * @param T - The type of the result of evaluating.
 */
export abstract class Expression<T> implements Evaluator<T> {
  public abstract evaluate(): T;

  public findVariable(name: string): VariableExpression<T> {
    const searchResult = {
      var: <VariableExpression<T>>null,
      found: false
    };

    this.findVariableExpression(name, searchResult);
    return searchResult.var;
  }

  public findAllVariables(): VariableExpression<T>[] {
      const vars: VariableExpression<T>[] = [];
      this.findAllVariableExpressions(vars);
      return vars;
  }

  public abstract findVariableExpression(name: string, searchResult: { var: VariableExpression<T>, found: boolean }): void;

  public abstract findAllVariableExpressions(foundVariables: VariableExpression<T>[]): void;

  public abstract replaceChild(oldExpression: Expression<T>, newExpression: Expression<T>): void;


  protected wrapWithParentheses(expr: Expression<T>, ...conditions: Function[]): string {
    for (const cond of conditions) {
      if (expr instanceof cond) {
        return `(${expr})`;
      }
    }

    return expr.toString();
  }
}
