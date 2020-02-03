import { Complex } from 'mathcore/complex';
import { CMatrix } from 'mathcore/linear-algebra/cmatrix';
import { Expression } from '../expression';
import { ComplexResult } from '../builders/complex-expression-tree-builder';
import { ArgumentError } from 'mathcore/errors/argument-error';
import { Func } from 'mathcore/func';
import { VariableExpression } from '../variable-expression';
import { ParametricFunctionCreator } from '../builders/parametric-function-creator';

export class ExprHelper {
  public static evaluateAsInteger(expression: Expression<ComplexResult>): number {
      const o = expression.evaluate();

      if (typeof o === 'number' && Number.isInteger(o)) {
        return o;
      } else if (o instanceof Complex) {
        return ExprHelper.asInteger(o);
      } else if (o instanceof CMatrix) {
        throw ExprHelper.throwInvalidArgumentType('integer', 'complex matrix');
      }

      throw ExprHelper.throwInvalidArgumentType('integer', o);
  }

  public static evaluateAsReal(expression: Expression<ComplexResult>): number {
    const o = expression.evaluate();

    if (typeof o === 'number') {
      return o;
    } else if (o instanceof Complex) {
      return ExprHelper.asReal(o);
    } else if (o instanceof CMatrix) {
      throw ExprHelper.throwInvalidArgumentType('real', 'complex matrix');
    }

    throw ExprHelper.throwInvalidArgumentType('real', o);
  }

  public static evaluateAsComplex(expression: Expression<ComplexResult>): Complex {
    const o = expression.evaluate();

    if (o instanceof Complex) {
      return o;
    } else if (o instanceof CMatrix) {
      throw ExprHelper.throwInvalidArgumentType('complex', 'complex matrix');
    }

    throw ExprHelper.throwInvalidArgumentType('complex', o);
  }

  public static evaluateAsCMatrix(expression: Expression<ComplexResult>): CMatrix {
      const o = expression.evaluate();

      if (o instanceof CMatrix) {
        return o;
      } else if (o instanceof Complex) {
        throw ExprHelper.throwInvalidArgumentType('complex matrix', 'complex');
      }

      throw ExprHelper.throwInvalidArgumentType('complex matrix', o);
  }

  public static evaluateAsComplexFunction(expression: Expression<ComplexResult>, variable: Expression<ComplexResult>): Func<Complex> {
    const varExpr: VariableExpression<ComplexResult> = variable as VariableExpression<ComplexResult>;

    if (varExpr === null) {
      throw ExprHelper.throwInvalidArgumentType('variable', variable.evaluate());
    }

    const tempFunc = ParametricFunctionCreator.createOneParametricFunction<ComplexResult>(expression, varExpr);
    return x => <Complex>tempFunc(x);
  }

  public static asInteger(c: Complex): number {
    if (c.isReal) {
      if (Number.isInteger(c.real)) {
        return c.real;
      }

      throw ExprHelper.throwInvalidArgumentType('integer', 'real');
    }

    throw ExprHelper.throwInvalidArgumentType('integer', 'complex');
  }

  public static asReal(c: Complex): number {
    if (c.isReal) {
      return c.real;
    }

    throw ExprHelper.throwInvalidArgumentType('real', 'complex');
  }

  public static throwInvalidArgumentType(expected: string, actual: string | Object): Error {
    let actualStr = '';
    if (typeof actual === 'string') {
      actualStr = actual;
    } else {
      actualStr = actual.constructor.name;
    }

    return new ArgumentError(`Invalid argument type. Expected '${expected}' but found '${actualStr}'.`);
  }
}
