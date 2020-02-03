import { Complex } from 'mathcore/complex';
import { ConstantExpression } from '../constant-expression';
import { ComplexResult } from '../builders/complex-expression-tree-builder';
import { displayNameAttribute } from '../metadata/display-name.attribute';
import { constantAttribute } from '../metadata/constant.attribute';

@displayNameAttribute('Imaginary unit')
@constantAttribute('i', '1i')
export class ImaginaryConstantExpression extends ConstantExpression<ComplexResult> {
  public get name() {
    return 'I';
  }

  public evaluate(): ComplexResult {
    return Complex.I;
  }
}

@displayNameAttribute('Number \'pi\'')
@constantAttribute('pi', '3.141592653589793...')
export class PiConstantExpression extends ConstantExpression<ComplexResult> {
  private static readonly const: Complex = Complex.fromReal(Math.PI);

  public get name() {
    return 'PI';
  }

  public evaluate(): ComplexResult {
    return PiConstantExpression.const;
  }
}

@displayNameAttribute('Number \'e\'')
@constantAttribute('e', '2.718281828459045...')
export class EConstantExpression extends ConstantExpression<ComplexResult> {
  private static readonly const: Complex = Complex.fromReal(Math.E);

  public get name() {
    return 'E';
  }

  public evaluate(): ComplexResult {
    return EConstantExpression.const;
  }
}

@displayNameAttribute('Golden ratio')
@constantAttribute('goldrat', '1.6180339887498949...')
export class GoldenRatioConstantExpression extends ConstantExpression<ComplexResult> {
  private static readonly const: Complex = Complex.fromReal(1.6180339887498949);

  public get name() {
    return 'GoldenRatio';
  }

  public evaluate(): ComplexResult {
    return GoldenRatioConstantExpression.const;
  }
}

@displayNameAttribute('Euler\'s constant')
@constantAttribute('euler', '0.57721566490153287...')
export class EulerConstantExpression extends ConstantExpression<ComplexResult> {
  private static readonly const: Complex = Complex.fromReal(0.57721566490153287);

  public get name() {
    return 'Euler';
  }

  public evaluate(): ComplexResult {
    return EulerConstantExpression.const;
  }
}

@displayNameAttribute('Catalan\'s constant')
@constantAttribute('catalan', '0.91596559417721901...')
export class CatalanConstantExpression extends ConstantExpression<ComplexResult> {
  private static readonly const: Complex = Complex.fromReal(0.91596559417721901);

  public get name() {
    return 'G';
  }

  public evaluate(): ComplexResult {
    return CatalanConstantExpression.const;
  }
}

@displayNameAttribute('Square root of 2')
@constantAttribute('sqrt2', '1.4142135623730952...')
export class Sqrt2ConstantExpression extends ConstantExpression<ComplexResult> {
  private static readonly const: Complex = Complex.fromReal(1.4142135623730952);

  public get name() {
    return 'Sqrt2';
  }

  public evaluate(): ComplexResult {
    return Sqrt2ConstantExpression.const;
  }
}

@displayNameAttribute('Square root of 3')
@constantAttribute('sqrt3', '1.7320508075688772...')
export class Sqrt3ConstantExpression extends ConstantExpression<ComplexResult> {
  private static readonly const: Complex = Complex.fromReal(1.7320508075688772);

  public get name() {
    return 'Sqrt3';
  }

  public evaluate(): ComplexResult {
    return Sqrt3ConstantExpression.const;
  }
}

@displayNameAttribute('Maximum value')
@constantAttribute('maxval', '1E+307')
export class MaxValueConstantExpression extends ConstantExpression<ComplexResult> {
  private static readonly const: Complex = Complex.fromReal(1E307);

  public get name() {
    return 'MaxVal';
  }

  public evaluate(): ComplexResult {
    return MaxValueConstantExpression.const;
  }
}

@displayNameAttribute('Minimum value')
@constantAttribute('minval', '-1E+307')
export class MinValueConstantExpression extends ConstantExpression<ComplexResult> {
  private static readonly const: Complex = Complex.fromReal(-1E307);

  public get name() {
    return 'MinVal';
  }

  public evaluate(): ComplexResult {
    return MinValueConstantExpression.const;
  }
}

@displayNameAttribute('Infinity')
@constantAttribute('inf', 'Infinity')
export class InfinityConstantExpression extends ConstantExpression<ComplexResult> {
  private static readonly const: Complex = Complex.fromReal(Number.POSITIVE_INFINITY);

  public get name() {
    return 'Inf';
  }

  public evaluate(): ComplexResult {
    return InfinityConstantExpression.const;
  }
}



export default [
  ImaginaryConstantExpression,
  PiConstantExpression,
  EConstantExpression,
  GoldenRatioConstantExpression,
  EulerConstantExpression,
  CatalanConstantExpression,
  Sqrt2ConstantExpression,
  Sqrt3ConstantExpression,
  MaxValueConstantExpression,
  MinValueConstantExpression,
  InfinityConstantExpression
];
