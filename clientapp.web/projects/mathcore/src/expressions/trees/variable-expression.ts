import { Expression } from './expression';
import { UnassignedVariableError } from '../unassigned-variable-error';

export class VariableExpression<T> extends Expression<T> {
  private _value: T;
  private assigned: boolean = false;

  public get value() {
    return this._value;
  }

  public set value(value: T) {
    this.assigned = true;
    this._value = value;
  }

  constructor(
    public readonly variableName: string,
    public readonly displayName: string = variableName) {
      super();
    }

  public evaluate(): T {
    if (!this.assigned) {
      throw new UnassignedVariableError(this.variableName);
    }

    return this.value;
  }

  public findVariableExpression(name: string, searchResult: { var: VariableExpression<T>, found: boolean }): void {
    if (!searchResult.found) {
      if (this.variableName === name) {
        searchResult.var = this;
        searchResult.found = true;
      }
    }
  }

  public findAllVariableExpressions(foundVariables: VariableExpression<T>[]): void {
    if (foundVariables.indexOf(this) === -1) {
      foundVariables.push(this);
    }
  }

  public replaceChild(oldExpression: Expression<T>, newExpression: Expression<T>): void { }

  public toString() {
    return this.displayName;
  }
}
