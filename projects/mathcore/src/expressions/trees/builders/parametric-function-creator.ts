import { Expression } from '../expression';
import { VariableExpression } from '../variable-expression';
import { ArgumentError } from 'mathcore/errors/argument-error';
import { ComplexResult } from './complex-expression-tree-builder';
import { Complex } from 'mathcore/complex';


class ZeroParametricFunctionCreator<T> {
  constructor(public readonly expression: Expression<T>) { }

  public evaluate(arg: T): T {
    return this.expression.evaluate();
  }
}

class OneParametricFunctionCreator<T> {
  constructor(public readonly expression: Expression<T>, public readonly variable: VariableExpression<T>) { }

  public evaluate(arg: T): T {
    this.variable.value = arg;
    return this.expression.evaluate();
  }
}

class TwoParametricFunctionCreator<T> {
  constructor(
    public readonly expression: Expression<T>,
    public readonly firstVariable: VariableExpression<T>,
    public readonly secondVariable: VariableExpression<T>) {}

  public evaluate(arg1: T, arg2: T): T {
    this.firstVariable.value = arg1;
    this.secondVariable.value = arg2;
    return this.expression.evaluate();
  }
}


export class ParametricFunctionCreator {
  public static createOneParametricFunctionFromVarName<T>(expression: Expression<T>, varName: string): (arg: T) => T {
    const variable = expression.findVariable(varName);

    if (variable === null) {
      const creator = new ZeroParametricFunctionCreator<T>(expression);
      return (arg: T) => creator.evaluate(arg);
    } else {
      const creator = new OneParametricFunctionCreator<T>(expression, variable);
      return (arg: T) => creator.evaluate(arg);
    }
  }

  public static createOneParametricFunction<T>(expression: Expression<T>, variable: VariableExpression<T>): (arg: T) => T {
    const creator = new OneParametricFunctionCreator<T>(expression, variable);
    return (arg: T) => creator.evaluate(arg);
  }


  public static createTwoParametricFunctionFromVarNames<T>(
    expression: Expression<T>, firstVarName: string, secondVarName: string): (arg1: T, arg2: T) => T {
      const variable1 = expression.findVariable(firstVarName);
      if (variable1 === null) {
        throw new ArgumentError(`Variable '${firstVarName}' not found.`);
      }

      const variable2 = expression.findVariable(secondVarName);
      if (variable2 === null) {
        throw new ArgumentError(`Variable '${secondVarName}' not found.`);
      }

      const creator = new TwoParametricFunctionCreator<T>(expression, variable1, variable2);
      return (arg1: T, arg2: T) => creator.evaluate(arg1, arg2);
  }

  public static createTwoParametricFunction<T>(
    expression: Expression<T>,
    firstVar: VariableExpression<T>,
    secondVar: VariableExpression<T>): (arg1: T, arg2: T) => T {
      const creator = new TwoParametricFunctionCreator<T>(expression, firstVar, secondVar);
      return (arg1: T, arg2: T) => creator.evaluate(arg1, arg2);
  }

  public static createRealFunctionFromComplexExpression(
    expression: Expression<ComplexResult>,
    varName: string):
    (arg: number) => number {
      const f = ParametricFunctionCreator.createOneParametricFunctionFromVarName(expression, varName);

      return (x: number) => {
        try {
          const result = <Complex>f(Complex.fromReal(x));
          return result.isReal ? result.real : Number.NaN;
        } catch {
          return Number.NaN;
        }
      };
  }
}
