import { displayNameAttribute } from '../metadata/display-name.attribute';
import { categoryAttribute } from '../metadata/category.attribute';
import { sectionAttribute } from '../metadata/section.attribute';
import { descriptionAttribute } from '../metadata/description.attribute';
import { functionSignatureAttribute } from '../metadata/function-signature.attribute';
import { exampleUsageAttribute } from '../metadata/example-usage.attribute';
import { Categories } from './categories';
import { Sections } from './sections';
import { Complex } from 'mathcore/complex';
import { CMatrix } from 'mathcore/linear-algebra/cmatrix';
import { Expression } from '../expression';
import { ScalarExpression } from '../scalar-expression';
import { UnaryExpression } from '../unary-expression';
import { BinaryExpression } from '../binary-expression';
import { ComplexResult } from '../builders/complex-expression-tree-builder';
import { ExprHelper } from './expr-helper';
import { functionAttribute } from '../metadata/function.attribute';

@displayNameAttribute('Signature')
@categoryAttribute(Categories.Basic)
@descriptionAttribute('Calculates sign of a complex number.')
@functionAttribute('sign')
@functionSignatureAttribute('complex value')
@exampleUsageAttribute('sign(12.8)', '1')
@exampleUsageAttribute('sign(-5)', '-1')
export class SignFuncExpression extends UnaryExpression<ComplexResult> {
  constructor(subExpression: Expression<ComplexResult>) {
    super(subExpression);
  }

  public evaluate(): ComplexResult {
    return Complex.fromReal(Complex.sign(ExprHelper.evaluateAsComplex(this.subExpression)));
  }
}

@displayNameAttribute('Absolute value')
@categoryAttribute(Categories.Basic)
@descriptionAttribute('Calculates absolute value (modulus) of a complex number. Formula to calculate: |z| = sqrt(x^2+y^2)')
@functionAttribute('abs')
@functionSignatureAttribute('complex value')
@exampleUsageAttribute('abs(-12.5)', '12.5')
@exampleUsageAttribute('abs(-3+4i)', '5')
export class AbsFuncExpression extends UnaryExpression<ComplexResult> {
  constructor(subExpression: Expression<ComplexResult>) {
    super(subExpression);
  }

  public evaluate(): ComplexResult {
    return Complex.fromReal(Complex.abs(ExprHelper.evaluateAsComplex(this.subExpression)));
  }
}

@displayNameAttribute('Inverse')
@categoryAttribute(Categories.Basic)
@descriptionAttribute('Calculates inverse value of a complex number or matrix.')
@functionAttribute('inv')
@functionSignatureAttribute('complex value')
@functionSignatureAttribute('complex matrix value')
@exampleUsageAttribute('inv(5)', '0.2')
@exampleUsageAttribute('inv({1, 2; 3, 4})', '{-2, 1; 1.5, -0.5}')
export class InvFuncExpression extends UnaryExpression<ComplexResult> {
  constructor(subExpression: Expression<ComplexResult>) {
    super(subExpression);
  }

  public evaluate(): ComplexResult {
    const value = this.subExpression.evaluate();

    if (value instanceof Complex) {
      return Complex.inverse(value);
    } else if (value instanceof CMatrix) {
      return CMatrix.inverse(value);
    }

    throw ExprHelper.throwInvalidArgumentType('complex or complex matrix', value);
  }
}

@displayNameAttribute('Square')
@categoryAttribute(Categories.Basic)
@descriptionAttribute('Calculates complex number or matrix value raised to second power.')
@functionAttribute('sqr')
@functionSignatureAttribute('complex value')
@functionSignatureAttribute('complex matrix value')
@exampleUsageAttribute('sqr(-5)', '25')
@exampleUsageAttribute('sqr(2 - 3i)', '-5 - 12i')
@exampleUsageAttribute('sqr({2, 3; 5, 8})', '{19, 30; 50, 79}')
export class SquareFuncExpression extends UnaryExpression<ComplexResult> {
  constructor(subExpression: Expression<ComplexResult>) {
    super(subExpression);
  }

  public evaluate(): ComplexResult {
    const value = this.subExpression.evaluate();

    if (value instanceof Complex) {
      return Complex.pow(value, 2);
    } else if (value instanceof CMatrix) {
      return CMatrix.powInt(value, 2);
    }

    throw ExprHelper.throwInvalidArgumentType('complex or complex matrix', value);
  }
}

@displayNameAttribute('Cube')
@categoryAttribute(Categories.Basic)
@descriptionAttribute('Calculates complex number or matrix value raised to third power.')
@functionAttribute('cube')
@functionSignatureAttribute('complex value')
@functionSignatureAttribute('complex matrix value')
@exampleUsageAttribute('cube(13)', '2197')
@exampleUsageAttribute('cube(-1 + 3i)', '26 - 18i')
@exampleUsageAttribute('cube({2i, -3; 55, 8})', '{-1320 - 668i, 315 - 48i; -5775 + 880i, -2128 - 330i}')
export class CubeFuncExpression extends UnaryExpression<ComplexResult> {
  constructor(subExpression: Expression<ComplexResult>) {
    super(subExpression);
  }

  public evaluate(): ComplexResult {
    const value = this.subExpression.evaluate();

    if (value instanceof Complex) {
      return Complex.pow(value, 3);
    } else if (value instanceof CMatrix) {
      return CMatrix.powInt(value, 3);
    }

    throw ExprHelper.throwInvalidArgumentType('complex or complex matrix', value);
  }
}

@displayNameAttribute('Square root')
@categoryAttribute(Categories.Basic)
@descriptionAttribute('Calculates square root of complex number or matrix.')
@functionAttribute('sqrt')
@functionSignatureAttribute('complex value')
// @functionSignatureAttribute('complex matrix value')
@exampleUsageAttribute('sqrt(-4)', '2i')
@exampleUsageAttribute('sqrt({33, 24; 48, 57})', '{5, 2; 4, 7}')
export class SqrtFuncExpression extends UnaryExpression<ComplexResult> {
  constructor(subExpression: Expression<ComplexResult>) {
    super(subExpression);
  }

  public evaluate(): ComplexResult {
    const value = this.subExpression.evaluate();

    if (value instanceof Complex) {
      return Complex.sqrt(value);
    }

    /** @todo: Implement sqrt for complex matrix */
    /*else if (value instanceof CMatrix) {
      return CMatrix.Sqrt(value);
    }*/

    throw ExprHelper.throwInvalidArgumentType('complex', value);
  }
}

@displayNameAttribute('Nth root')
@categoryAttribute(Categories.Basic)
@descriptionAttribute('Calculates n-th root of complex number or matrix.')
@functionAttribute('nthroot')
@functionSignatureAttribute('complex value', 'complex n')
@exampleUsageAttribute('nthroot(27, 3)', '3')
export class NthRootFuncExpression extends BinaryExpression<ComplexResult> {
  constructor(valueExpression: Expression<ComplexResult>, expExpression: Expression<ComplexResult>) {
    super(valueExpression, expExpression);
  }

  public evaluate(): ComplexResult {
    const value = ExprHelper.evaluateAsComplex(this.leftExpression);
    const exp = ExprHelper.evaluateAsComplex(this.rightExpression);

    return Complex.pow(value, Complex.inverse(exp));
  }
}

@displayNameAttribute('Pow ten')
@categoryAttribute(Categories.Basic)
@descriptionAttribute('Calculates the number 10 raised to the specified power.')
@functionAttribute('powten')
@functionSignatureAttribute('complex value')
@exampleUsageAttribute('powten(2)', '100')
@exampleUsageAttribute('powten(3)', '1000')
export class PowTenFuncExpression extends UnaryExpression<ComplexResult> {
  constructor(subExpression: Expression<ComplexResult>) {
    super(subExpression);
  }

  public evaluate(): ComplexResult {
    return Complex.pow(Complex.fromReal(10.0), ExprHelper.evaluateAsComplex(this.subExpression));
  }
}

@displayNameAttribute('Modulo')
@categoryAttribute(Categories.Basic)
@descriptionAttribute('Calculates remainder of division of one number by another.')
@functionAttribute('mod')
@functionSignatureAttribute('real x', 'real y')
@exampleUsageAttribute('mod(5, 3)', '2')
export class ModuloFuncExpression extends BinaryExpression<ComplexResult> {
  constructor(xExpression: Expression<ComplexResult>, yExpression: Expression<ComplexResult>) {
    super(xExpression, yExpression);
  }

  public evaluate(): ComplexResult {
    const x = ExprHelper.evaluateAsReal(this.leftExpression);
    const y = ExprHelper.evaluateAsReal(this.rightExpression);

    return Complex.fromReal(x % y);
  }
}

@displayNameAttribute('Integer part')
@categoryAttribute(Categories.Basic)
@sectionAttribute(Sections.NumParts)
@descriptionAttribute('Calculates the integer part of a complex number. Nearest integer number from the left.')
@functionAttribute('int')
@functionSignatureAttribute('complex value')
@exampleUsageAttribute('int(3.6)', '3')
@exampleUsageAttribute('int(-5.2)', '-6')
@exampleUsageAttribute('int(-1.1 + 13.6i)', '-2 + 13i')
export class IntegerPartFuncExpression extends UnaryExpression<ComplexResult> {
  constructor(subExpression: Expression<ComplexResult>) {
    super(subExpression);
  }

  public evaluate(): ComplexResult {
    return Complex.intPart(ExprHelper.evaluateAsComplex(this.subExpression));
  }
}

@displayNameAttribute('Fractional part')
@categoryAttribute(Categories.Basic)
@sectionAttribute(Sections.NumParts)
@descriptionAttribute('Calculates the fractional part of a complex number.')
@functionAttribute('frac')
@functionSignatureAttribute('complex value')
@exampleUsageAttribute('frac(3.6)', '0.6')
@exampleUsageAttribute('frac(-5.2)', '0.8')
@exampleUsageAttribute('frac(-1.1 + 13.6i)', '0.9 + 0.6i')
export class FractionalPartFuncExpression extends UnaryExpression<ComplexResult> {
  constructor(subExpression: Expression<ComplexResult>) {
    super(subExpression);
  }

  public evaluate(): ComplexResult {
    return Complex.fracPart(ExprHelper.evaluateAsComplex(this.subExpression));
  }
}

@displayNameAttribute('Floor')
@categoryAttribute(Categories.Basic)
@sectionAttribute(Sections.TruncationAndRoundOff)
@descriptionAttribute('Calculates the largest complex integer less than or equal to the specified complex number.')
@functionAttribute('floor')
@functionSignatureAttribute('complex value')
@exampleUsageAttribute('floor(3.6)', '3')
@exampleUsageAttribute('floor(-5.2)', '-6')
@exampleUsageAttribute('floor(-1.1 + 13.6i)', '-2 + 13i')
export class FloorFuncExpression extends UnaryExpression<ComplexResult> {
  constructor(subExpression: Expression<ComplexResult>) {
    super(subExpression);
  }

  public evaluate(): ComplexResult {
    return Complex.floor(ExprHelper.evaluateAsComplex(this.subExpression));
  }
}

@displayNameAttribute('Ceiling')
@categoryAttribute(Categories.Basic)
@sectionAttribute(Sections.TruncationAndRoundOff)
@descriptionAttribute('Calculates the smallest complex integer greater than or equal to the specified complex number.')
@functionAttribute('ceil')
@functionSignatureAttribute('complex value')
@exampleUsageAttribute('ceil(3.6)', '4')
@exampleUsageAttribute('ceil(-5.2)', '-5')
@exampleUsageAttribute('ceil(-1.1 + 13.6i)', '-1 + 14i')
export class CeilingFuncExpression extends UnaryExpression<ComplexResult> {
  constructor(subExpression: Expression<ComplexResult>) {
    super(subExpression);
  }

  public evaluate(): ComplexResult {
    return Complex.ceil(ExprHelper.evaluateAsComplex(this.subExpression));
  }
}

@displayNameAttribute('Round')
@categoryAttribute(Categories.Basic)
@sectionAttribute(Sections.TruncationAndRoundOff)
@descriptionAttribute('Rounds a complex value to the nearest integer.')
@functionAttribute('round')
@functionSignatureAttribute('complex value')
@functionSignatureAttribute('complex value', 'integer digits')
@exampleUsageAttribute('round(3.6)', '4')
@exampleUsageAttribute('round(5.2)', '5')
@exampleUsageAttribute('round(12.24667, 3)', '12.247')
export class RoundFuncExpression extends BinaryExpression<ComplexResult> {
  constructor(
    valueExpression: Expression<ComplexResult>,
    digitsExpression: Expression<ComplexResult> = new ScalarExpression<ComplexResult>(Complex.zero)) {
    super(valueExpression, digitsExpression);
  }

  public evaluate(): ComplexResult {
    const value = ExprHelper.evaluateAsComplex(this.leftExpression);
    const digits = ExprHelper.evaluateAsInteger(this.rightExpression);

    return Complex.round(value, digits);
  }
}

@displayNameAttribute('Truncate')
@categoryAttribute(Categories.Basic)
@sectionAttribute(Sections.TruncationAndRoundOff)
@descriptionAttribute('Calculates the integral part of a specified complex number.')
@functionAttribute('trunc')
@functionSignatureAttribute('complex value')
@exampleUsageAttribute('trunc(3.6)', '3')
@exampleUsageAttribute('trunc(-5.2)', '-5')
@exampleUsageAttribute('trunc(-1.1 + 13.6i)', '-1 + 13i')
export class TruncateFuncExpression extends UnaryExpression<ComplexResult> {
  constructor(subExpression: Expression<ComplexResult>) {
    super(subExpression);
  }

  public evaluate(): ComplexResult {
    return Complex.trun(ExprHelper.evaluateAsComplex(this.subExpression));
  }
}


export default [
  SignFuncExpression,
  AbsFuncExpression,
  InvFuncExpression,
  SquareFuncExpression,
  CubeFuncExpression,
  SqrtFuncExpression,
  NthRootFuncExpression,
  PowTenFuncExpression,
  ModuloFuncExpression,
  IntegerPartFuncExpression,
  FractionalPartFuncExpression,
  FloorFuncExpression,
  CeilingFuncExpression,
  RoundFuncExpression,
  TruncateFuncExpression,
];
