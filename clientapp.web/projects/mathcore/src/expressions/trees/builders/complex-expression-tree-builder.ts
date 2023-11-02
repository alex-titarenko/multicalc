import { ArgumentError } from 'mathcore/errors/argument-error';
import { Complex } from 'mathcore/complex';
import { CMatrix } from 'mathcore/linear-algebra/cmatrix';
import { Convert } from 'mathcore/convert';
import { SimpleExpressionTreeBuilder, TreeBuilderBag } from './simple-expression-tree-builder';
import { Expression } from '../expression';
import { ScalarExpression } from '../scalar-expression';
import { BinaryExpression } from '../binary-expression';
import { AddExpression } from '../add-expression';
import { SubExpression } from '../sub-expression';
import { MultExpression } from '../mult-expression';
import { DivExpression } from '../div-expression';
import { PercentExpression } from '../percent-expression';
import { PowExpression } from '../pow-expression';
import { UnaryMinusExpression } from '../unary-minus-expression';
import { UnaryExpression } from '../unary-expression';
import { MultiaryExpression } from '../multiary-expression';
import { ExprHelper } from '../functions/expr-helper';
import { Token } from 'mathcore/expressions/tokenize/token';
import { Enumerator } from 'mathcore/helpers/enumerator';
import { MatrixSizeMismatchError } from 'mathcore/linear-algebra/matrix-size-mismatch-error';
import { DivideByZeroError } from 'mathcore/errors/divide-by-zero-error';

export type ComplexResult = Complex | CMatrix;

export class ComplexExpressionTreeBuilder extends SimpleExpressionTreeBuilder<ComplexResult> {
  constructor() {
    super();

    this.unaryOperatorHandlers['['] = (tokens, vars) => this.handleMatrixBracket(tokens, vars);
  }

  protected createAddExpression(): BinaryExpression<ComplexResult> {
    return new AddComplexExpression();
  }

  protected createSubExpression(): BinaryExpression<ComplexResult> {
    return new SubComplexExpression();
  }

  protected createMultExpression(): BinaryExpression<ComplexResult> {
    return new MultComplexExpression();
  }

  protected createDivExpression(): DivExpression<ComplexResult> {
    return new DivComplexExpression();
  }

  protected createPercentExpression(): BinaryExpression<ComplexResult> {
    return new PercentComplexExpression();
  }

  protected createPowExpression(): BinaryExpression<ComplexResult> {
    return new PowComplexExpression();
  }

  protected createSqrtExpression(subExpression: Expression<ComplexResult>): UnaryExpression<ComplexResult> {
    return new SqrtOperatorExpression(subExpression);
  }

  protected createUnaryMinusExpression(subExpression: Expression<ComplexResult>): UnaryExpression<ComplexResult> {
    return new UnaryMinusComplexExpression(subExpression);
  }

  protected parseScalarValue(s: string): ScalarExpression<ComplexResult> {
    let scalar: Complex;

    if (s.endsWith('i') || s.endsWith('j')) {
      scalar = Complex.fromRealImaginary(0, Convert.toDecimal(s.substr(0, s.length - 1)));
    } else {
      scalar = Complex.fromReal(Convert.toNumber(s));
    }

    return new ScalarExpression<ComplexResult>(scalar);
  }

  private handleMatrixBracket(tokens: Enumerator<Token>, bag: TreeBuilderBag<ComplexResult>): Expression<ComplexResult> {
    let value = this.addSub(tokens, bag);

    if (tokens.current.value === ']') {
        tokens.moveNext();
        return new CMatrixExpression(1, value);
    } else if (tokens.current.value === ',' || tokens.current.value === ';') {
        let stride: number | null = null;
        let currLineLenght = 1;
        const m: Expression<ComplexResult>[] = [];
        m.push(value);

        while (tokens.current.value === ',' || tokens.current.value === ';') {
          if (tokens.current.value === ';') {
            if (stride === null) {
              stride = currLineLenght;
            } else if (stride !== currLineLenght) {
              throw new MatrixSizeMismatchError();
            }
            currLineLenght = 1;
          } else {
            currLineLenght++;
            if (stride !== null && currLineLenght > stride) {
              throw new MatrixSizeMismatchError();
            }
          }

          value = this.addSub(tokens, bag);
          m.push(value);
        }

        if (tokens.current.value !== ']') {
          throw new SyntaxError('"]" expected.');
        }

        tokens.moveNext();
        return new CMatrixExpression(stride || m.length, ...m);
    } else {
      throw new SyntaxError('"]" expected.');
    }
  }
}

function throwWrongArgumentType(op: string): Error {
  return new ArgumentError(`Wrong type arguments operation '${op}'.`);
}

class AddComplexExpression extends AddExpression<ComplexResult> {
  public evaluate(): ComplexResult {
    const left = this.leftExpression.evaluate();
    const right = this.rightExpression.evaluate();

    if (left instanceof Complex) {
      if (right instanceof Complex) {
        return Complex.add(left, right);
      } else if (right instanceof CMatrix) {
        return CMatrix.add(right, left);
      } else {
        throw throwWrongArgumentType('+');
      }
    } else if (left instanceof CMatrix) {
      if (right instanceof Complex) {
        return CMatrix.add(left, right);
      } else if (right instanceof CMatrix) {
        return CMatrix.add(left, right);
      } else {
        throw throwWrongArgumentType('+');
      }
    } else {
      throw throwWrongArgumentType('+');
    }
  }
}

class SubComplexExpression extends SubExpression<ComplexResult> {
  public evaluate(): ComplexResult {
    const left = this.leftExpression.evaluate();
    const right = this.rightExpression.evaluate();

    if (left instanceof Complex) {
      if (right instanceof Complex) {
        return Complex.sub(left, right);
      } else if (right instanceof CMatrix) {
        return CMatrix.sub(left, right);
      } else {
        throw throwWrongArgumentType('-');
      }
    } else if (left instanceof CMatrix) {
      if (right instanceof Complex) {
        return CMatrix.sub(left, right);
      } else if (right instanceof CMatrix) {
        return CMatrix.sub(left, right);
      } else {
        throw throwWrongArgumentType('-');
      }
    } else {
      throw throwWrongArgumentType('-');
    }
  }
}

class MultComplexExpression extends MultExpression<ComplexResult> {
  public evaluate(): ComplexResult {
    const left = this.leftExpression.evaluate();
    const right = this.rightExpression.evaluate();

    if (left instanceof Complex) {
      if (right instanceof Complex) {
        return Complex.mult(left, right);
      } else if (right instanceof CMatrix) {
        return CMatrix.mult(right, left);
      } else {
        throw throwWrongArgumentType('*');
      }
    } else if (left instanceof CMatrix) {
      if (right instanceof Complex) {
        return CMatrix.mult(left, right);
      } else if (right instanceof CMatrix) {
        return CMatrix.mult(left, right);
      } else {
        throw throwWrongArgumentType('*');
      }
    } else {
      throw throwWrongArgumentType('*');
    }
  }
}

class DivComplexExpression extends DivExpression<ComplexResult> {
  public evaluate(): ComplexResult {
    const left = this.leftExpression.evaluate();
    const right = this.rightExpression.evaluate();

    if (left instanceof Complex) {
      if (right instanceof Complex) {
        this.throwErrorOnDivideByZero(right);
        return Complex.div(left, right);
      } else if (right instanceof CMatrix) {
        this.throwErrorOnDivideByZeroForMatrix(right);
        return CMatrix.div(left, right);
      } else {
        throw throwWrongArgumentType('/');
      }
    } else if (left instanceof CMatrix) {
      if (right instanceof Complex) {
        this.throwErrorOnDivideByZero(right);
        return CMatrix.div(left, right);
      } else if (right instanceof CMatrix) {
        return CMatrix.div(left, right);
      } else {
        throw throwWrongArgumentType('/');
      }
    } else {
      throw throwWrongArgumentType('/');
    }
  }

  private throwErrorOnDivideByZero(c: Complex) {
    if (this.errorOnDivideByZero && c.isZero) {
      throw new DivideByZeroError();
    }
  }

  private throwErrorOnDivideByZeroForMatrix(c: CMatrix) {
    if (this.errorOnDivideByZero && !c.isSquare) {
      for (let i = 0; i < c.rows; i++) {
        for (let j = 0; j < c.columns; j++) {
          if (c.get(i, j).isZero) {
            throw new DivideByZeroError();
          }
        }
      }
    }
  }
}

class PercentComplexExpression extends PercentExpression<ComplexResult> {
  public evaluate(): ComplexResult {
    const left = this.leftExpression.evaluate();
    const right = this.rightExpression.evaluate();

    if (left instanceof Complex && left.isReal) {
      if (right instanceof Complex && right.isReal) {
        return Complex.fromReal(left.real / 100 * right.real);
      } else {
        throw throwWrongArgumentType('%');
      }
    } else {
      throw throwWrongArgumentType('%');
    }
  }
}

class PowComplexExpression extends PowExpression<ComplexResult> {
  public evaluate(): ComplexResult {
    const left = this.leftExpression.evaluate();
    const right = this.rightExpression.evaluate();

    if (left instanceof Complex) {
      if (right instanceof Complex) {
        return Complex.pow(left, right);
      } else {
        throw throwWrongArgumentType('^');
      }
    } else if (left instanceof CMatrix) {
      if (right instanceof Complex) {
        return this.evaluateCMatrixComplex(left, right);
      } else {
        throw throwWrongArgumentType('^');
      }
    } else {
      throw throwWrongArgumentType('^');
    }
  }

  private evaluateCMatrixComplex(left: CMatrix, right: Complex): CMatrix {
    if (left.isVector) {
      return CMatrix.pow(left, right);
    } else if (left.isSquare) {
      if (right.isReal && Number.isInteger(right.real)) {
        return CMatrix.powInt(left, right.real);
      } else {
        throw new ArgumentError('The matrix can be raised only to integer power.');
      }
    } else {
      throw new ArgumentError('The matrix must be square or column vector.');
    }
  }
}

/** @todo: implement sqrt for complex matrix */
class SqrtOperatorExpression extends UnaryExpression<ComplexResult> {
  constructor(subExpression: Expression<ComplexResult>) {
    super(subExpression);
  }

  public evaluate(): ComplexResult {
    const value = ExprHelper.evaluateAsComplex(this.subExpression);
    return Complex.sqrt(value);
  }
}

class UnaryMinusComplexExpression extends UnaryMinusExpression<ComplexResult> {
  constructor(subExpression: Expression<ComplexResult>) {
    super(subExpression);
  }

  public evaluate(): ComplexResult {
    const value = this.subExpression.evaluate();

    if (value instanceof Complex) {
      return Complex.negate(value);
    } else if (value instanceof CMatrix) {
      return CMatrix.negate(value);
    } else {
      throw throwWrongArgumentType('-');
    }
  }
}

class CMatrixExpression extends MultiaryExpression<ComplexResult> {
  constructor(public readonly stride: number,
    ...expressions: Expression<ComplexResult>[]) {
    super(...expressions);
  }

  public evaluate(): ComplexResult {
    const matrix = new CMatrix(this.expressions.length / this.stride, this.stride);

    let currRow = 0;
    let currCol = 0;
    for (const expr of this.expressions) {
      const item = ExprHelper.evaluateAsComplex(expr);
      matrix.set(currRow, currCol, item);

      if (currCol >= this.stride - 1) {
        currCol = 0;
        currRow++;
      } else {
        currCol++;
      }
    }

    return matrix;
  }

  public toString(): string {
    let result = '[';

    let i = 0;
    for (const expression of this.expressions) {
      result += expression.toString();

      if (i < this.expressions.length - 1) {
        if ((i + 1) % this.stride === 0) {
          result += '; ';
        } else {
          result += ',';
        }
      }

      i++;
    }

    result += ']';
    return result;
  }
}
