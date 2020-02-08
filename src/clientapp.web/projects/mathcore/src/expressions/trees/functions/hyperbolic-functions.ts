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
import { ComplexResult } from '../builders/complex-expression-tree-builder';
import { ExprHelper } from './expr-helper';
import { functionAttribute } from '../metadata/function.attribute';


@displayNameAttribute('Sine')
@categoryAttribute(Categories.Hyperbolic)
@descriptionAttribute('Calculates the hyperbolic sine of a complex number.')
@functionAttribute('sinh')
@functionSignatureAttribute('complex value')
@exampleUsageAttribute('sinh(0)', '0')
export class HyperbolicSineFuncExpression extends UnaryExpression<ComplexResult> {
  constructor(subExpression: Expression<ComplexResult>) {
    super(subExpression);
  }

  public evaluate(): ComplexResult {
    return Complex.sinh(ExprHelper.evaluateAsComplex(this.subExpression));
  }
}

@displayNameAttribute('Cosine')
@categoryAttribute(Categories.Hyperbolic)
@descriptionAttribute('Calculates the hyperbolic cosine of a complex number.')
@functionAttribute('cosh')
@functionSignatureAttribute('complex value')
@exampleUsageAttribute('cosh(0)', '1')
export class HyperbolicCosineFuncExpression extends UnaryExpression<ComplexResult> {
  constructor(subExpression: Expression<ComplexResult>) {
    super(subExpression);
  }

  public evaluate(): ComplexResult {
    return Complex.cosh(ExprHelper.evaluateAsComplex(this.subExpression));
  }
}

@displayNameAttribute('Tangent')
@categoryAttribute(Categories.Hyperbolic)
@descriptionAttribute('Calculates the hyperbolic tangent of a complex number.')
@functionAttribute('tanh')
@functionSignatureAttribute('complex value')
@exampleUsageAttribute('tanh(0)', '0')
export class HyperbolicTangentFuncExpression extends UnaryExpression<ComplexResult> {
  constructor(subExpression: Expression<ComplexResult>) {
    super(subExpression);
  }

  public evaluate(): ComplexResult {
    return Complex.tanh(ExprHelper.evaluateAsComplex(this.subExpression));
  }
}

@displayNameAttribute('Cotangent')
@categoryAttribute(Categories.Hyperbolic)
@descriptionAttribute('Calculates the hyperbolic cotangent of a complex number.')
@functionAttribute('coth')
@functionSignatureAttribute('complex value')
@exampleUsageAttribute('coth(pi / 4)', '1.52486861882206')
export class HyperbolicCotangentFuncExpression extends UnaryExpression<ComplexResult> {
  constructor(subExpression: Expression<ComplexResult>) {
    super(subExpression);
  }

  public evaluate(): ComplexResult {
    return Complex.coth(ExprHelper.evaluateAsComplex(this.subExpression));
  }
}

@displayNameAttribute('Secant')
@categoryAttribute(Categories.Hyperbolic)
@descriptionAttribute('Calculates the hyperbolic secant of a complex number.')
@functionAttribute('sech')
@functionSignatureAttribute('complex value')
@exampleUsageAttribute('sech(pi / 3)', '0.624887966296087')
export class HyperbolicSecantFuncExpression extends UnaryExpression<ComplexResult> {
  constructor(subExpression: Expression<ComplexResult>) {
    super(subExpression);
  }

  public evaluate(): ComplexResult {
    return Complex.sech(ExprHelper.evaluateAsComplex(this.subExpression));
  }
}

@displayNameAttribute('Cosecant')
@categoryAttribute(Categories.Hyperbolic)
@descriptionAttribute('Calculates the hyperbolic cosecant of a complex number.')
@functionAttribute('csch')
@functionSignatureAttribute('complex value')
@exampleUsageAttribute('csch(pi / 6)', '1.82530557468795')
export class HyperbolicCosecantFuncExpression extends UnaryExpression<ComplexResult> {
  constructor(subExpression: Expression<ComplexResult>) {
    super(subExpression);
  }

  public evaluate(): ComplexResult {
    return Complex.csch(ExprHelper.evaluateAsComplex(this.subExpression));
  }
}



@displayNameAttribute('Inverse sine')
@categoryAttribute(Categories.Hyperbolic)
@sectionAttribute(Sections.InverseFunctions)
@descriptionAttribute('Calculates the inverse hyperbolic sine of a complex number.')
@functionAttribute('asinh')
@functionSignatureAttribute('complex value')
@exampleUsageAttribute('asinh(0)', '0')
export class InverseHyperbolicSineFuncExpression extends UnaryExpression<ComplexResult> {
  constructor(subExpression: Expression<ComplexResult>) {
    super(subExpression);
  }

  public evaluate(): ComplexResult {
    return Complex.asinh(ExprHelper.evaluateAsComplex(this.subExpression));
  }
}

@displayNameAttribute('Inverse cosine')
@categoryAttribute(Categories.Hyperbolic)
@sectionAttribute(Sections.InverseFunctions)
@descriptionAttribute('Calculates the inverse hyperbolic cosine of a complex number.')
@functionAttribute('acosh')
@functionSignatureAttribute('complex value')
@exampleUsageAttribute('acosh(1)', '0')
export class InverseHyperbolicCosineFuncExpression extends UnaryExpression<ComplexResult> {
  constructor(subExpression: Expression<ComplexResult>) {
    super(subExpression);
  }

  public evaluate(): ComplexResult {
    return Complex.acosh(ExprHelper.evaluateAsComplex(this.subExpression));
  }
}

@displayNameAttribute('Inverse tangent')
@categoryAttribute(Categories.Hyperbolic)
@sectionAttribute(Sections.InverseFunctions)
@descriptionAttribute('Calculates the inverse hyperbolic tangent of a complex number.')
@functionAttribute('atanh')
@functionSignatureAttribute('complex value')
@exampleUsageAttribute('atanh(0)', '0')
export class InverseHyperbolicTangentFuncExpression extends UnaryExpression<ComplexResult> {
  constructor(subExpression: Expression<ComplexResult>) {
    super(subExpression);
  }

  public evaluate(): ComplexResult {
    return Complex.atanh(ExprHelper.evaluateAsComplex(this.subExpression));
  }
}

@displayNameAttribute('Inverse cotangent')
@categoryAttribute(Categories.Hyperbolic)
@sectionAttribute(Sections.InverseFunctions)
@descriptionAttribute('Calculates the inverse hyperbolic cotangent of a complex number.')
@functionAttribute('acoth')
@functionSignatureAttribute('complex value')
@exampleUsageAttribute('acoth(3)', '0.346573590279973')
export class InverseHyperbolicCotangentFuncExpression extends UnaryExpression<ComplexResult> {
  constructor(subExpression: Expression<ComplexResult>) {
    super(subExpression);
  }

  public evaluate(): ComplexResult {
    return Complex.acoth(ExprHelper.evaluateAsComplex(this.subExpression));
  }
}

@displayNameAttribute('Inverse secant')
@categoryAttribute(Categories.Hyperbolic)
@sectionAttribute(Sections.InverseFunctions)
@descriptionAttribute('Calculates the inverse hyperbolic secant of a complex number.')
@functionAttribute('asech')
@functionSignatureAttribute('complex value')
@exampleUsageAttribute('asech(1)', '0')
export class InverseHyperbolicSecantFuncExpression extends UnaryExpression<ComplexResult> {
  constructor(subExpression: Expression<ComplexResult>) {
    super(subExpression);
  }

  public evaluate(): ComplexResult {
    return Complex.asech(ExprHelper.evaluateAsComplex(this.subExpression));
  }
}

@displayNameAttribute('Inverse cosecant')
@categoryAttribute(Categories.Hyperbolic)
@sectionAttribute(Sections.InverseFunctions)
@descriptionAttribute('Calculates the inverse hyperbolic cosecant of a complex number.')
@functionAttribute('acsch')
@functionSignatureAttribute('complex value')
@exampleUsageAttribute('acsch(2)', '0.481211825059603')
export class InverseHyperbolicCosecantFuncExpression extends UnaryExpression<ComplexResult> {
  constructor(subExpression: Expression<ComplexResult>) {
    super(subExpression);
  }

  public evaluate(): ComplexResult {
    return Complex.acsch(ExprHelper.evaluateAsComplex(this.subExpression));
  }
}



@displayNameAttribute('Sine cardinal')
@categoryAttribute(Categories.Hyperbolic)
@sectionAttribute(Sections.CardinalFunctions)
@descriptionAttribute('Calculates the hyperbolic sine cardinal (sinh(x) / x) of a complex number.')
@functionAttribute('sinhc')
@functionSignatureAttribute('complex value')
@exampleUsageAttribute('sinhc(0)', '1')
@exampleUsageAttribute('sinhc(1)', '1.1752011936438')
export class HyperbolicSineCardinalFuncExpression extends UnaryExpression<ComplexResult> {
  constructor(subExpression: Expression<ComplexResult>) {
    super(subExpression);
  }

  public evaluate(): ComplexResult {
    return Complex.sinhc(ExprHelper.evaluateAsComplex(this.subExpression));
  }
}

@displayNameAttribute('Tangent cardinal')
@categoryAttribute(Categories.Hyperbolic)
@sectionAttribute(Sections.CardinalFunctions)
@descriptionAttribute('Calculates the hyperbolic tangent cardinal (tanh(x) / x) of a complex number.')
@functionAttribute('tanhc')
@functionSignatureAttribute('complex value')
@exampleUsageAttribute('tanhc(0)', '1')
@exampleUsageAttribute('tanhc(1)', '0.761594155955765')
export class HyperbolicTangentCardinalFuncExpression extends UnaryExpression<ComplexResult> {
  constructor(subExpression: Expression<ComplexResult>) {
    super(subExpression);
  }

  public evaluate(): ComplexResult {
    return Complex.tanhc(ExprHelper.evaluateAsComplex(this.subExpression));
  }
}


export default [
  HyperbolicSineFuncExpression,
  HyperbolicCosineFuncExpression,
  HyperbolicTangentFuncExpression,
  HyperbolicCotangentFuncExpression,
  HyperbolicSecantFuncExpression,
  HyperbolicCosecantFuncExpression,
  InverseHyperbolicSineFuncExpression,
  InverseHyperbolicCosineFuncExpression,
  InverseHyperbolicTangentFuncExpression,
  InverseHyperbolicCotangentFuncExpression,
  InverseHyperbolicSecantFuncExpression,
  InverseHyperbolicCosecantFuncExpression,
  HyperbolicSineCardinalFuncExpression,
  HyperbolicTangentCardinalFuncExpression
];
