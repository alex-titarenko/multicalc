import { displayNameAttribute } from '../metadata/display-name.attribute';
import { categoryAttribute } from '../metadata/category.attribute';
import { sectionAttribute } from '../metadata/section.attribute';
import { descriptionAttribute } from '../metadata/description.attribute';
import { functionSignatureAttribute } from '../metadata/function-signature.attribute';
import { exampleUsageAttribute } from '../metadata/example-usage.attribute';
import { Categories } from './categories';
import { Sections } from './sections';
import { Complex } from 'mathcore/complex';
import { Expression } from '../expression';
import { UnaryExpression } from '../unary-expression';
import { TrigonometricFunctionExpression } from '../trigonometric-function-expression';
import { ComplexResult } from '../builders/complex-expression-tree-builder';
import { ExprHelper } from './expr-helper';
import { functionAttribute } from '../metadata/function.attribute';
import { BinaryExpression } from '../binary-expression';
import { Convert, AngleMode } from 'mathcore/convert';

//#region Triginometric Functions

abstract class TrigonometricComplexFunctionExpression extends TrigonometricFunctionExpression<ComplexResult> {
  protected abstract trigFunc: (c: Complex) => ComplexResult;

  public evaluate(): ComplexResult {
    let result = ExprHelper.evaluateAsComplex(this.subExpression);

    if (this.angleMode !== AngleMode.Radian) {
      result = new Complex(Convert.toRadians(result.real, this.angleMode), result.imag);
    }

    return this.trigFunc(result);
  }
}

@displayNameAttribute('Sine')
@categoryAttribute(Categories.Trigonometric)
@descriptionAttribute('Calculates the sine of a complex number.')
@functionAttribute('sin')
@functionSignatureAttribute('complex value')
@exampleUsageAttribute('sin(0)', '0')
export class SineFuncExpression extends TrigonometricComplexFunctionExpression {
  constructor(subExpression: Expression<ComplexResult>) {
    super(subExpression);
  }

  protected trigFunc = Complex.sin;
}

@displayNameAttribute('Cosine')
@categoryAttribute(Categories.Trigonometric)
@descriptionAttribute('Calculates the cosine of a complex number.')
@functionAttribute('cos')
@functionSignatureAttribute('complex value')
@exampleUsageAttribute('cos(0)', '1')
export class CosineFuncExpression extends TrigonometricComplexFunctionExpression {
  constructor(subExpression: Expression<ComplexResult>) {
    super(subExpression);
  }

  protected trigFunc = Complex.cos;
}

@displayNameAttribute('Tangent')
@categoryAttribute(Categories.Trigonometric)
@descriptionAttribute('Calculates the tangent of a complex number.')
@functionAttribute('tan')
@functionSignatureAttribute('complex value')
@exampleUsageAttribute('tan(0)', '0')
export class TangentFuncExpression extends TrigonometricComplexFunctionExpression {
  constructor(subExpression: Expression<ComplexResult>) {
    super(subExpression);
  }

  protected trigFunc = Complex.tan;
}

@displayNameAttribute('Cotangent')
@categoryAttribute(Categories.Trigonometric)
@descriptionAttribute('Calculates the cotangent of a complex number.')
@functionAttribute('cot')
@functionSignatureAttribute('complex value')
@exampleUsageAttribute('cot(pi / 4)', '1')
export class CotangentFuncExpression extends TrigonometricComplexFunctionExpression {
  constructor(subExpression: Expression<ComplexResult>) {
    super(subExpression);
  }

  protected trigFunc = Complex.cot;
}

@displayNameAttribute('Secant')
@categoryAttribute(Categories.Trigonometric)
@descriptionAttribute('Calculates the secant of a complex number.')
@functionAttribute('sec')
@functionSignatureAttribute('complex value')
@exampleUsageAttribute('sec(pi / 3)', '2')
export class SecantFuncExpression extends TrigonometricComplexFunctionExpression {
  constructor(subExpression: Expression<ComplexResult>) {
    super(subExpression);
  }

  protected trigFunc = Complex.sec;
}

@displayNameAttribute('Cosecant')
@categoryAttribute(Categories.Trigonometric)
@descriptionAttribute('Calculates the cosecant of a complex number.')
@functionAttribute('csc')
@functionSignatureAttribute('complex value')
@exampleUsageAttribute('csc(pi / 6)', '2')
export class CosecantFuncExpression extends TrigonometricComplexFunctionExpression {
  constructor(subExpression: Expression<ComplexResult>) {
    super(subExpression);
  }

  protected trigFunc = Complex.csc;
}


@displayNameAttribute('Versine')
@categoryAttribute(Categories.Trigonometric)
@sectionAttribute(Sections.RareFunctions)
@descriptionAttribute('Calculates the versine (1 - cos(x)) of a complex number.')
@functionAttribute('vers')
@functionSignatureAttribute('complex value')
@exampleUsageAttribute('vers(pi)', '2')
export class VersineFuncExpression extends TrigonometricComplexFunctionExpression {
  constructor(subExpression: Expression<ComplexResult>) {
    super(subExpression);
  }

  protected trigFunc = Complex.vers;
}

@displayNameAttribute('Coversine')
@categoryAttribute(Categories.Trigonometric)
@sectionAttribute(Sections.RareFunctions)
@descriptionAttribute('Calculates the coversine (1 - sin(x)) of a complex number.')
@functionAttribute('cvs')
@functionSignatureAttribute('complex value')
@exampleUsageAttribute('cvs(pi)', '1')
export class CoversineFuncExpression extends TrigonometricComplexFunctionExpression {
  constructor(subExpression: Expression<ComplexResult>) {
    super(subExpression);
  }

  protected trigFunc = Complex.cvs;
}

@displayNameAttribute('Haversine')
@categoryAttribute(Categories.Trigonometric)
@sectionAttribute(Sections.RareFunctions)
@descriptionAttribute('Calculates the haversine ((1 - cos(x)) / 2) of a complex number.')
@functionAttribute('hav')
@functionSignatureAttribute('complex value')
@exampleUsageAttribute('hav(pi / 2)', '0.5')
export class HaversineFuncExpression extends TrigonometricComplexFunctionExpression {
  constructor(subExpression: Expression<ComplexResult>) {
    super(subExpression);
  }

  protected trigFunc = Complex.hav;
}

@displayNameAttribute('Exsecant')
@categoryAttribute(Categories.Trigonometric)
@sectionAttribute(Sections.RareFunctions)
@descriptionAttribute('Calculates the exsecant (sec(x) - 1) of a complex number.')
@functionAttribute('exsec')
@functionSignatureAttribute('complex value')
@exampleUsageAttribute('exsec(pi)', '-2')
export class ExsecantFuncExpression extends TrigonometricComplexFunctionExpression {
  constructor(subExpression: Expression<ComplexResult>) {
    super(subExpression);
  }

  protected trigFunc = Complex.exsec;
}

@displayNameAttribute('Excosecant')
@categoryAttribute(Categories.Trigonometric)
@sectionAttribute(Sections.RareFunctions)
@descriptionAttribute('Calculates the excosecant (csc(x) - 1) of a complex number.')
@functionAttribute('excsc')
@functionSignatureAttribute('complex value')
@exampleUsageAttribute('excsc(pi / 2)', '0')
export class ExcosecantFuncExpression extends TrigonometricComplexFunctionExpression {
  constructor(subExpression: Expression<ComplexResult>) {
    super(subExpression);
  }

  protected trigFunc = Complex.excsc;
}

@displayNameAttribute('Sine cardinal')
@categoryAttribute(Categories.Trigonometric)
@sectionAttribute(Sections.CardinalFunctions)
@descriptionAttribute('Calculates the sine cardinal (sin(x) / x) of a complex number.')
@functionAttribute('sinc')
@functionSignatureAttribute('complex value')
@exampleUsageAttribute('sinc(0)', '1')
@exampleUsageAttribute('sinc(1)', '0.841470984807897')
export class SineCardinalFuncExpression extends TrigonometricComplexFunctionExpression {
  constructor(subExpression: Expression<ComplexResult>) {
    super(subExpression);
  }

  protected trigFunc = Complex.sinc;
}

@displayNameAttribute('Tangent cardinal')
@categoryAttribute(Categories.Trigonometric)
@sectionAttribute(Sections.CardinalFunctions)
@descriptionAttribute('Calculates the tangent cardinal (tan(x) / x) of a complex number.')
@functionAttribute('tanc')
@functionSignatureAttribute('complex value')
@exampleUsageAttribute('tanc(0)', '1')
@exampleUsageAttribute('tanc(1)', '1.5574077246549')
export class TangentCardinalFuncExpression extends TrigonometricComplexFunctionExpression {
  constructor(subExpression: Expression<ComplexResult>) {
    super(subExpression);
  }

  protected trigFunc = Complex.tanc;
}

//#endregion

//#region Inverse Functions

abstract class InverseTrigonometricComplexFunctionExpression extends TrigonometricFunctionExpression<ComplexResult> {
  protected abstract trigFunc: (c: Complex) => ComplexResult;

  public evaluate(): ComplexResult {
    const arc = ExprHelper.evaluateAsComplex(this.subExpression);
    let result = <Complex>this.trigFunc(arc);

    if (this.angleMode !== AngleMode.Radian) {
      result = new Complex(Convert.fromRadians(result.real, this.angleMode), result.imag);
    }

    return result;
  }
}

@displayNameAttribute('Inverse sine')
@categoryAttribute(Categories.Trigonometric)
@sectionAttribute(Sections.InverseFunctions)
@descriptionAttribute('Calculates the inverse sine of a complex number.')
@functionAttribute('asin')
@functionSignatureAttribute('complex value')
@exampleUsageAttribute('asin(0)', '0')
export class InverseSineFuncExpression extends InverseTrigonometricComplexFunctionExpression {
  constructor(subExpression: Expression<ComplexResult>) {
    super(subExpression);
  }

  protected trigFunc = Complex.asin;
}

@displayNameAttribute('Inverse cosine')
@categoryAttribute(Categories.Trigonometric)
@sectionAttribute(Sections.InverseFunctions)
@descriptionAttribute('Calculates the inverse cosine of a complex number.')
@functionAttribute('acos')
@functionSignatureAttribute('complex value')
@exampleUsageAttribute('acos(1)', '0')
export class InverseCosineFuncExpression extends InverseTrigonometricComplexFunctionExpression {
  constructor(subExpression: Expression<ComplexResult>) {
    super(subExpression);
  }

  protected trigFunc = Complex.acos;
}

@displayNameAttribute('Inverse tangent')
@categoryAttribute(Categories.Trigonometric)
@sectionAttribute(Sections.InverseFunctions)
@descriptionAttribute('Calculates the inverse tangent of a complex number.')
@functionAttribute('atan')
@functionSignatureAttribute('complex value')
@exampleUsageAttribute('atan(0)', '0')
export class InverseTangentFuncExpression extends InverseTrigonometricComplexFunctionExpression {
  constructor(subExpression: Expression<ComplexResult>) {
    super(subExpression);
  }

  protected trigFunc = Complex.atan;
}

@displayNameAttribute('Inverse cotangent')
@categoryAttribute(Categories.Trigonometric)
@sectionAttribute(Sections.InverseFunctions)
@descriptionAttribute('Calculates the inverse cotangent of a complex number.')
@functionAttribute('acot')
@functionSignatureAttribute('complex value')
@exampleUsageAttribute('acot(1)', '0.785398163397448')
export class InverseCotangentFuncExpression extends InverseTrigonometricComplexFunctionExpression {
  constructor(subExpression: Expression<ComplexResult>) {
    super(subExpression);
  }

  protected trigFunc = Complex.acot;
}

@displayNameAttribute('Inverse secant')
@categoryAttribute(Categories.Trigonometric)
@sectionAttribute(Sections.InverseFunctions)
@descriptionAttribute('Calculates the inverse secant of a complex number.')
@functionAttribute('asec')
@functionSignatureAttribute('complex value')
@exampleUsageAttribute('asec(2)', '1.0471975511966')
export class InverseSecantFuncExpression extends InverseTrigonometricComplexFunctionExpression {
  constructor(subExpression: Expression<ComplexResult>) {
    super(subExpression);
  }

  protected trigFunc = Complex.asec;
}

@displayNameAttribute('Inverse cosecant')
@categoryAttribute(Categories.Trigonometric)
@sectionAttribute(Sections.InverseFunctions)
@descriptionAttribute('Calculates the inverse cosecant of a complex number.')
@functionAttribute('acsc')
@functionSignatureAttribute('complex value')
@exampleUsageAttribute('acsc(2)', '0.523598775598299')
export class InverseCosecantFuncExpression extends InverseTrigonometricComplexFunctionExpression {
  constructor(subExpression: Expression<ComplexResult>) {
    super(subExpression);
  }

  protected trigFunc = Complex.acsc;
}

//#endregion

@displayNameAttribute('Angle')
@categoryAttribute(Categories.Trigonometric)
@sectionAttribute(Sections.Angle)
@descriptionAttribute('Calculates the angle whose tangent is the quotient of two specified numbers.')
@functionAttribute('atan2')
@functionSignatureAttribute('real y', 'real x')
@exampleUsageAttribute('atan2(4, 3)', '0.927295218001612')
export class AngleFuncExpression extends BinaryExpression<ComplexResult> {
  constructor(yExpression: Expression<ComplexResult>, xExpression: Expression<ComplexResult>) {
    super(yExpression, xExpression);
  }

  public evaluate(): ComplexResult {
    const y = ExprHelper.evaluateAsReal(this.leftExpression);
    const x = ExprHelper.evaluateAsReal(this.rightExpression);

    return Complex.fromReal(Math.atan2(y, x));
  }
}

@displayNameAttribute('Degrees to radians')
@categoryAttribute(Categories.Trigonometric)
@sectionAttribute(Sections.AngleConversion)
@descriptionAttribute('Calculates the value of the angle in radians converted from degrees.')
@functionAttribute('rad')
@functionSignatureAttribute('real degree')
@exampleUsageAttribute('rad(90)', '1.5707963267949')
@exampleUsageAttribute('rad(180)', '3.14159265358979')
export class DegreesToRadiansFuncExpression extends UnaryExpression<ComplexResult> {
  constructor(subExpression: Expression<ComplexResult>) {
    super(subExpression);
  }

  public evaluate(): ComplexResult {
    return Complex.fromReal(Convert.toRadians(ExprHelper.evaluateAsReal(this.subExpression), AngleMode.Degree));
  }
}

@displayNameAttribute('Radians to degrees')
@categoryAttribute(Categories.Trigonometric)
@sectionAttribute(Sections.AngleConversion)
@descriptionAttribute('Calculates the value of the angle in degrees converted from radians.')
@functionAttribute('deg')
@functionSignatureAttribute('real radian')
@exampleUsageAttribute('deg(pi / 2)', '90')
@exampleUsageAttribute('deg(pi)', '180')
export class RadiansToDegreesFuncExpression extends UnaryExpression<ComplexResult> {
  constructor(subExpression: Expression<ComplexResult>) {
    super(subExpression);
  }

  public evaluate(): ComplexResult {
    return Complex.fromReal(Convert.fromRadians(ExprHelper.evaluateAsReal(this.subExpression), AngleMode.Degree));
  }
}

export default [
  SineFuncExpression,
  CosineFuncExpression,
  TangentFuncExpression,
  CotangentFuncExpression,
  SecantFuncExpression,
  CosecantFuncExpression,
  InverseSineFuncExpression,
  InverseCosineFuncExpression,
  InverseTangentFuncExpression,
  InverseCotangentFuncExpression,
  InverseSecantFuncExpression,
  InverseCosecantFuncExpression,
  AngleFuncExpression,
  VersineFuncExpression,
  CoversineFuncExpression,
  HaversineFuncExpression,
  ExsecantFuncExpression,
  ExcosecantFuncExpression,
  SineCardinalFuncExpression,
  TangentCardinalFuncExpression,
  DegreesToRadiansFuncExpression,
  RadiansToDegreesFuncExpression
];
