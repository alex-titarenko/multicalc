import { displayNameAttribute } from '../metadata/display-name.attribute';
import { categoryAttribute } from '../metadata/category.attribute';
import { descriptionAttribute } from '../metadata/description.attribute';
import { functionSignatureAttribute } from '../metadata/function-signature.attribute';
import { exampleUsageAttribute } from '../metadata/example-usage.attribute';
import { Categories } from './categories';
import { Complex } from 'mathcore/complex';
import { Expression } from '../expression';
import { UnaryExpression } from '../unary-expression';
import { ComplexResult } from '../builders/complex-expression-tree-builder';
import { ExprHelper } from './expr-helper';
import { functionAttribute } from '../metadata/function.attribute';


@displayNameAttribute('Real part')
@categoryAttribute(Categories.ComplexNumbers)
@descriptionAttribute('Calculates the real part of a complex number.')
@functionAttribute('re')
@functionSignatureAttribute('complex value')
@exampleUsageAttribute('re(3.8 + 11i)', '3.8')
export class RealPartFuncExpression extends UnaryExpression<ComplexResult> {
  constructor(subExpression: Expression<ComplexResult>) {
    super(subExpression);
  }

  public evaluate(): ComplexResult {
    return Complex.fromReal(ExprHelper.evaluateAsComplex(this.subExpression).real);
  }
}

@displayNameAttribute('Imaginary part')
@categoryAttribute(Categories.ComplexNumbers)
@descriptionAttribute('Calculates the imaginary part of a complex number.')
@functionAttribute('im')
@functionSignatureAttribute('complex value')
@exampleUsageAttribute('im(3.8 + 11i)', '11')
export class ImaginaryPartFuncExpression extends UnaryExpression<ComplexResult> {
  constructor(subExpression: Expression<ComplexResult>) {
    super(subExpression);
  }

  public evaluate(): ComplexResult {
    return Complex.fromReal(ExprHelper.evaluateAsComplex(this.subExpression).imag);
  }
}

@displayNameAttribute('Argument')
@categoryAttribute(Categories.ComplexNumbers)
@descriptionAttribute('Calculates the argument of a complex number.')
@functionAttribute('arg')
@functionSignatureAttribute('complex value')
@exampleUsageAttribute('arg(2 + 3i)', '0.982793723247329')
@exampleUsageAttribute('arg(0)', 'NaN')
export class ArgumentFuncExpression extends UnaryExpression<ComplexResult> {
  constructor(subExpression: Expression<ComplexResult>) {
    super(subExpression);
  }

  public evaluate(): ComplexResult {
    return Complex.fromReal(Complex.arg(ExprHelper.evaluateAsComplex(this.subExpression)));
  }
}

@displayNameAttribute('Conjugation number')
@categoryAttribute(Categories.ComplexNumbers)
@descriptionAttribute('Calculates conjugation number for a complex number.')
@functionAttribute('conj')
@functionSignatureAttribute('complex value')
@exampleUsageAttribute('conj(3 + 5i)', '3 - 5i')
@exampleUsageAttribute('conj(-3 - 8i)', '-3 + 8i')
@exampleUsageAttribute('conj(3)', '3')
export class ConjugationNumberFuncExpression extends UnaryExpression<ComplexResult> {
  constructor(subExpression: Expression<ComplexResult>) {
    super(subExpression);
  }

  public evaluate(): ComplexResult {
    return Complex.conj(ExprHelper.evaluateAsComplex(this.subExpression));
  }
}

export default [
  RealPartFuncExpression,
  ImaginaryPartFuncExpression,
  ArgumentFuncExpression,
  ConjugationNumberFuncExpression
];
