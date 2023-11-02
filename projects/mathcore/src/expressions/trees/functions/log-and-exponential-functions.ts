import { displayNameAttribute } from '../metadata/display-name.attribute';
import { categoryAttribute } from '../metadata/category.attribute';
import { descriptionAttribute } from '../metadata/description.attribute';
import { functionSignatureAttribute } from '../metadata/function-signature.attribute';
import { exampleUsageAttribute } from '../metadata/example-usage.attribute';
import { Categories } from './categories';
import { Complex } from 'mathcore/complex';
import { Expression } from '../expression';
import { UnaryExpression } from '../unary-expression';
import { BinaryExpression } from '../binary-expression';
import { ComplexResult } from '../builders/complex-expression-tree-builder';
import { ExprHelper } from './expr-helper';
import { functionAttribute } from '../metadata/function.attribute';
import { ScalarExpression } from '../scalar-expression';


@displayNameAttribute('Natural logarithm')
@categoryAttribute(Categories.LogAndExponential)
@descriptionAttribute('Calculates the natural logarithm of a complex number.')
@functionAttribute('ln')
@functionSignatureAttribute('complex value')
@exampleUsageAttribute('ln(e)', '1')
@exampleUsageAttribute('ln(1)', '0')
@exampleUsageAttribute('ln(3)', '1.09861228866811')
export class NaturalLogarithmFuncExpression extends UnaryExpression<ComplexResult> {
  constructor(subExpression: Expression<ComplexResult>) {
    super(subExpression);
  }

  public evaluate(): ComplexResult {
    return Complex.log(ExprHelper.evaluateAsComplex(this.subExpression));
  }
}

@displayNameAttribute('Logarithm')
@categoryAttribute(Categories.LogAndExponential)
@descriptionAttribute('Calculates the logarithm of a complex number in a specified base.')
@functionAttribute('log')
@functionSignatureAttribute('complex value')
@functionSignatureAttribute('complex value', 'real base')
@exampleUsageAttribute('log(10)', '1')
@exampleUsageAttribute('log(1)', '0')
@exampleUsageAttribute('log(3, 5)', '0.682606194485985')
@exampleUsageAttribute('log(e, e)', '1')
export class LogarithmFuncExpression extends BinaryExpression<ComplexResult> {
  constructor(
    valueExpression: Expression <ComplexResult>,
    baseExpression: Expression<ComplexResult> = new ScalarExpression<ComplexResult>(Complex.fromReal(10))) {
    super(valueExpression, baseExpression);
  }

  public evaluate(): ComplexResult {
    return Complex.log(ExprHelper.evaluateAsComplex(this.leftExpression), ExprHelper.evaluateAsReal(this.rightExpression));
  }
}

@displayNameAttribute('Exponential')
@categoryAttribute(Categories.LogAndExponential)
@descriptionAttribute('Calculates the exponential of a complex number or matrix.')
@functionAttribute('exp')
@functionSignatureAttribute('complex value')
// @functionSignatureAttribute('complex matrix value')
@exampleUsageAttribute('exp(0)', '1')
@exampleUsageAttribute('exp(1)', '2.71828182845905')
@exampleUsageAttribute('exp(3)', '20.0855369231877')
@exampleUsageAttribute('exp({1, 2; 5, 4})', '{115.528140598761, 115.16026115759; 287.900652893974, 288.268532335145}')
export class ExponentialFuncExpression extends UnaryExpression<ComplexResult> {
  constructor(subExpression: Expression<ComplexResult>) {
    super(subExpression);
  }

  public evaluate(): ComplexResult {
    const value = this.subExpression.evaluate();

    if (value instanceof Complex) {
      return Complex.exp(value);
    }

    /** @todo: Add support exp for complex matrix */
    /*else if (value instanceof CMatrix) {
      return CMatrix.Exp((CMatrix)value);
    }*/

    throw ExprHelper.throwInvalidArgumentType('complex', value);
  }
}

export default [
  NaturalLogarithmFuncExpression,
  LogarithmFuncExpression,
  ExponentialFuncExpression
];
