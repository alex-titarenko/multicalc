import { displayNameAttribute } from '../metadata/display-name.attribute';
import { categoryAttribute } from '../metadata/category.attribute';
import { descriptionAttribute } from '../metadata/description.attribute';
import { functionSignatureAttribute } from '../metadata/function-signature.attribute';
import { exampleUsageAttribute } from '../metadata/example-usage.attribute';
import { Categories } from './categories';
import { Complex } from 'mathcore/complex';
import { Expression } from '../expression';
import { TernaryExpression } from '../ternary-expression';
import { MultiaryExpression } from '../multiary-expression';
import { ComplexResult } from '../builders/complex-expression-tree-builder';
import { ExprHelper } from './expr-helper';
import { functionAttribute } from '../metadata/function.attribute';
import { sectionAttribute } from '../metadata/section.attribute';
import { Sections } from './sections';
import { Func } from 'mathcore/func';
import { ComplexIntegrator } from 'mathcore/numerical-analysis/numerical-integration/complex-Integrator';
import { ComplexAdaptiveIntegrator } from 'mathcore/numerical-analysis/numerical-integration/complex-adaptive-integrator';
import { NumericalDerivation } from 'mathcore/numerical-analysis/numerical-derivation';
import { Sequence } from 'mathcore/numerical-analysis/sequence';
import { PerformanceManager } from 'mathcore/performance/performance-manager';


@displayNameAttribute('Integration')
@categoryAttribute(Categories.Calculus)
@sectionAttribute(Sections.Integration)
@descriptionAttribute('Calculates the numerical value of the definite integral complex function of one variable using adaptive method.')
@functionAttribute('integ')
@functionSignatureAttribute('expression expr', 'real a', 'real b', 'variable var')
@exampleUsageAttribute('integ(sin(x), 0, pi, x)', '2')
@exampleUsageAttribute('integ(e^x, -inf, 0, x)', '1')
export class IntegrationFuncExpression extends MultiaryExpression<ComplexResult> {
  protected integrator: ComplexIntegrator;

  constructor(...subExpressions: Expression<ComplexResult>[]) {
    super(...subExpressions);

    this.integrator = new ComplexAdaptiveIntegrator();
  }

  public evaluate(): ComplexResult {
    const targetFunc: Func<Complex> = ExprHelper.evaluateAsComplexFunction(this.expressions[0], this.expressions[3]);
    const a: number = ExprHelper.evaluateAsReal(this.expressions[1]);
    const b: number = ExprHelper.evaluateAsReal(this.expressions[2]);

    return this.integrator.integrate(targetFunc, a, b);
  }
}

@displayNameAttribute('1st derivation')
@categoryAttribute(Categories.Calculus)
@sectionAttribute(Sections.Derivation)
@descriptionAttribute('Calculates the value of the central derivative of the first order.')
@functionAttribute('derive')
@functionSignatureAttribute('expression expr', 'complex x', 'variable var')
@exampleUsageAttribute('derive(sin(x), pi/2, x)', '0')
export class FirstDerivationFuncExpression extends TernaryExpression<ComplexResult> {
  constructor(exprExpression: Expression<ComplexResult>, xExpression: Expression<ComplexResult>, varExpression: Expression<ComplexResult>) {
    super(exprExpression, xExpression, varExpression);
  }

  public evaluate(): ComplexResult {
    const targetFunc: Func<Complex> = ExprHelper.evaluateAsComplexFunction(this.firstExpression, this.thirdExpression);
    const x = ExprHelper.evaluateAsComplex(this.secondExpression);

    return NumericalDerivation.firstDerivative(targetFunc, x);
  }
}

@displayNameAttribute('2nd derivation')
@categoryAttribute(Categories.Calculus)
@sectionAttribute(Sections.Derivation)
@descriptionAttribute('Calculates the value of the central derivative of the second order.')
@functionAttribute('derive2')
@functionSignatureAttribute('expression expr', 'complex x', 'variable var')
@exampleUsageAttribute('derive2(e^x, 1, x)', '2.71828182845911')
export class SecondDerivationFuncExpression extends TernaryExpression<ComplexResult> {
  constructor(exprExpression: Expression<ComplexResult>, xExpression: Expression<ComplexResult>, varExpression: Expression<ComplexResult>) {
    super(exprExpression, xExpression, varExpression);
  }

  public evaluate(): ComplexResult {
    const targetFunc: Func<Complex> = ExprHelper.evaluateAsComplexFunction(this.firstExpression, this.thirdExpression);
    const x = ExprHelper.evaluateAsComplex(this.secondExpression);

    return NumericalDerivation.secondDerivative(targetFunc, x);
  }
}

@displayNameAttribute('3rd derivation')
@categoryAttribute(Categories.Calculus)
@sectionAttribute(Sections.Derivation)
@descriptionAttribute('Calculates the value of the central derivative of the third order.')
@functionAttribute('derive3')
@functionSignatureAttribute('expression expr', 'complex x', 'variable var')
@exampleUsageAttribute('derive3(1 + x^2, 1, x)', '0')
export class ThirdDerivationFuncExpression extends TernaryExpression<ComplexResult> {
  constructor(exprExpression: Expression<ComplexResult>, xExpression: Expression<ComplexResult>, varExpression: Expression<ComplexResult>) {
    super(exprExpression, xExpression, varExpression);
  }

  public evaluate(): ComplexResult {
    const targetFunc: Func<Complex> = ExprHelper.evaluateAsComplexFunction(this.firstExpression, this.thirdExpression);
    const x = ExprHelper.evaluateAsComplex(this.secondExpression);

    return NumericalDerivation.thirdDerivative(targetFunc, x);
  }
}

@displayNameAttribute('4th derivation')
@categoryAttribute(Categories.Calculus)
@sectionAttribute(Sections.Derivation)
@descriptionAttribute('Calculates the value of the central derivative of the fourth order.')
@functionAttribute('derive4')
@functionSignatureAttribute('expression expr', 'complex x', 'variable var')
@exampleUsageAttribute('derive4(sin(x^2), 2, x)', '-59.1602336374673')
export class FourthDerivationFuncExpression extends TernaryExpression<ComplexResult> {
  constructor(exprExpression: Expression<ComplexResult>, xExpression: Expression<ComplexResult>, varExpression: Expression<ComplexResult>) {
    super(exprExpression, xExpression, varExpression);
  }

  public evaluate(): ComplexResult {
    const targetFunc: Func<Complex> = ExprHelper.evaluateAsComplexFunction(this.firstExpression, this.thirdExpression);
    const x = ExprHelper.evaluateAsComplex(this.secondExpression);

    return NumericalDerivation.fourthDerivative(targetFunc, x);
  }
}

@displayNameAttribute('Summation of a sequance')
@categoryAttribute(Categories.Calculus)
@sectionAttribute(Sections.Sequence)
@descriptionAttribute('Calculates the sum of a sequence using initial value m and end value n.')
@functionAttribute('sums')
@functionSignatureAttribute('expression expr', 'integer m', 'integer n', 'variable var')
@exampleUsageAttribute('sums(x^2/2, 2, 3, x)', '6.5')
@exampleUsageAttribute('sums(sin(x + 2i), 0, 10, x)', '5.30916680950373 - 1.51402470396589i')
export class SummationSequanceFuncExpression extends MultiaryExpression<ComplexResult> {
  constructor(
    exprExpression: Expression<ComplexResult>,
    mExpression: Expression<ComplexResult>,
    nExpression: Expression<ComplexResult>,
    varExpression: Expression<ComplexResult>) {
    super(exprExpression, mExpression, nExpression, varExpression);
  }

  public evaluate(): ComplexResult {
    const targetFunc: Func<Complex> = ExprHelper.evaluateAsComplexFunction(this.expressions[0], this.expressions[3]);
    const m: number = ExprHelper.evaluateAsInteger(this.expressions[1]);
    const n: number = ExprHelper.evaluateAsInteger(this.expressions[2]);
    PerformanceManager.current.ensureAcceptableIterationCount(Math.abs(n - m));

    return Sequence.summation(targetFunc, m, n);
  }
}

@displayNameAttribute('Product of a sequance')
@categoryAttribute(Categories.Calculus)
@sectionAttribute(Sections.Sequence)
@descriptionAttribute('Calculates the product of a sequence using initial value m and end value n.')
@functionAttribute('prods')
@functionSignatureAttribute('expression expr', 'integer m', 'integer n', 'variable var')
@exampleUsageAttribute('prods(x^2 / 2, 2, 3, x)', '9')
@exampleUsageAttribute('prods(x * 2i, 0, 10, x)', '0')
export class ProductSequanceFuncExpression extends MultiaryExpression<ComplexResult> {
  constructor(
    exprExpression: Expression<ComplexResult>,
    mExpression: Expression<ComplexResult>,
    nExpression: Expression<ComplexResult>,
    varExpression: Expression<ComplexResult>) {
    super(exprExpression, mExpression, nExpression, varExpression);
  }

  public evaluate(): ComplexResult {
    const targetFunc: Func<Complex> = ExprHelper.evaluateAsComplexFunction(this.expressions[0], this.expressions[3]);
    const m: number = ExprHelper.evaluateAsInteger(this.expressions[1]);
    const n: number = ExprHelper.evaluateAsInteger(this.expressions[2]);
    PerformanceManager.current.ensureAcceptableIterationCount(Math.abs(n - m));

    return Sequence.product(targetFunc, m, n);
  }
}


export default [
  IntegrationFuncExpression,
  FirstDerivationFuncExpression,
  SecondDerivationFuncExpression,
  ThirdDerivationFuncExpression,
  FourthDerivationFuncExpression,
  SummationSequanceFuncExpression,
  ProductSequanceFuncExpression
];
