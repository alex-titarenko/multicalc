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
import { BinaryExpression } from '../binary-expression';
import { MultiaryExpression } from '../multiary-expression';
import { ComplexResult } from '../builders/complex-expression-tree-builder';
import { ExprHelper } from './expr-helper';
import { functionAttribute } from '../metadata/function.attribute';
import { Combinatorics } from 'mathcore/special-functions/combinatorics';
import { NumberTheory } from 'mathcore/special-functions/number-theory';
import { ProbabilityIntegrals } from 'mathcore/special-functions/probability-integrals';


@displayNameAttribute('Factorial')
@categoryAttribute(Categories.SpecialFunctions)
@sectionAttribute(Sections.Combinatorics)
@descriptionAttribute('Calculates the factorial of a positive integer.')
@functionAttribute('fact')
@functionSignatureAttribute('integer n')
@exampleUsageAttribute('fact(0)', '1')
@exampleUsageAttribute('fact(3)', '6')
@exampleUsageAttribute('fact(11)', '39916800')
export class FactorialFuncExpression extends UnaryExpression<ComplexResult> {
  constructor(subExpression: Expression<ComplexResult>) {
    super(subExpression);
  }

  public evaluate(): ComplexResult {
    return Complex.fromReal(Combinatorics.factorial(ExprHelper.evaluateAsInteger(this.subExpression)));
  }
}

@displayNameAttribute('Combinations')
@categoryAttribute(Categories.SpecialFunctions)
@sectionAttribute(Sections.Combinatorics)
@descriptionAttribute('Calculates the number of ways of picking k unordered outcomes from n possibilities.')
@functionAttribute('combin')
@functionSignatureAttribute('integer n', 'integer k')
@exampleUsageAttribute('combin(2, 1)', '2')
@exampleUsageAttribute('combin(5, 3)', '10')
@exampleUsageAttribute('combin(11, 6)', '462')
export class CombinationsFuncExpression extends BinaryExpression<ComplexResult> {
  constructor(nExpression: Expression<ComplexResult>, kExpression: Expression<ComplexResult>) {
    super(nExpression, kExpression);
  }

  public evaluate(): ComplexResult {
    return Complex.fromReal(Combinatorics.combinations(
      ExprHelper.evaluateAsInteger(this.leftExpression),
      ExprHelper.evaluateAsInteger(this.rightExpression))
    );
  }
}

@displayNameAttribute('Permutations')
@categoryAttribute(Categories.SpecialFunctions)
@sectionAttribute(Sections.Combinatorics)
@descriptionAttribute('Calculates the number of ways of obtaining an ordered subset of k elements from a set of n elements.')
@functionAttribute('permut')
@functionSignatureAttribute('integer n', 'integer k')
@exampleUsageAttribute('permut(2, 1)', '2')
@exampleUsageAttribute('permut(5, 3)', '60')
@exampleUsageAttribute('permut(11, 6)', '332640')
export class PermutationsFuncExpression extends BinaryExpression<ComplexResult> {
  constructor(nExpression: Expression<ComplexResult>, kExpression: Expression<ComplexResult>) {
    super(nExpression, kExpression);
  }

  public evaluate(): ComplexResult {
    return Complex.fromReal(Combinatorics.permutations(
      ExprHelper.evaluateAsInteger(this.leftExpression),
      ExprHelper.evaluateAsInteger(this.rightExpression))
    );
  }
}

@displayNameAttribute('Fibonacci')
@categoryAttribute(Categories.SpecialFunctions)
@sectionAttribute(Sections.Combinatorics)
@descriptionAttribute('Calculates the n-th Fibonacci number.')
@functionAttribute('fib')
@functionSignatureAttribute('integer n')
@exampleUsageAttribute('fib(0)', '0')
@exampleUsageAttribute('fib(3)', '2')
@exampleUsageAttribute('fib(8)', '21')
export class FibonacciFuncExpression extends UnaryExpression<ComplexResult> {
  constructor(subExpression: Expression<ComplexResult>) {
    super(subExpression);
  }

  public evaluate(): ComplexResult {
    return Complex.fromReal(Combinatorics.fibonacci(ExprHelper.evaluateAsInteger(this.subExpression)));
  }
}



@displayNameAttribute('Greatest common divisor')
@categoryAttribute(Categories.SpecialFunctions)
@sectionAttribute(Sections.NumberTheory)
@descriptionAttribute('Calculates the greatest common divisor of a set of integer numbers.')
@functionAttribute('gcd')
@functionSignatureAttribute('integer n1', 'integer n2', '...')
@exampleUsageAttribute('gcd(5, 2)', '1')
@exampleUsageAttribute('gcd(9, 6)', '3')
@exampleUsageAttribute('gcd(12, 6, 8, 24)', '2')
export class GcdFuncExpression extends MultiaryExpression<ComplexResult> {
  constructor(...subExpressions: Expression<ComplexResult>[]) {
    super(...subExpressions);
  }

  public evaluate(): ComplexResult {
    const args = this.expressions.map(arg => ExprHelper.evaluateAsInteger(arg));
    return Complex.fromReal(NumberTheory.gcd(...args));
  }
}

@displayNameAttribute('Least common multiple')
@categoryAttribute(Categories.SpecialFunctions)
@sectionAttribute(Sections.NumberTheory)
@descriptionAttribute('Calculates the least common multiple of a set of integer numbers.')
@functionAttribute('lcm')
@functionSignatureAttribute('integer n1', 'integer n2', '...')
@exampleUsageAttribute('lcm(5, 2)', '10')
@exampleUsageAttribute('lcm(9, 6)', '18')
@exampleUsageAttribute('lcm(12, 6, 5, 24)', '120')
export class LcmFuncExpression extends MultiaryExpression<ComplexResult> {
  constructor(...subExpressions: Expression<ComplexResult>[]) {
    super(...subExpressions);
  }

  public evaluate(): ComplexResult {
    const args = this.expressions.map(arg => ExprHelper.evaluateAsInteger(arg));
    return Complex.fromReal(NumberTheory.lcm(...args));
  }
}


@displayNameAttribute('Error function')
@categoryAttribute(Categories.SpecialFunctions)
@sectionAttribute(Sections.ProbabilityIntegrals)
@descriptionAttribute('Calculates the value of error function for the specified real argument.')
@functionAttribute('erf')
@functionSignatureAttribute('real value')
@exampleUsageAttribute('erf(0)', '0')
@exampleUsageAttribute('erf(1)', '0.842700792949715')
export class ErrorFuncExpression extends UnaryExpression<ComplexResult> {
  constructor(subExpression: Expression<ComplexResult>) {
    super(subExpression);
  }

  public evaluate(): ComplexResult {
    return Complex.fromReal(ProbabilityIntegrals.erf(ExprHelper.evaluateAsReal(this.subExpression)));
  }
}

@displayNameAttribute('Complementary error function')
@categoryAttribute(Categories.SpecialFunctions)
@sectionAttribute(Sections.ProbabilityIntegrals)
@descriptionAttribute('Calculates the value of complementary error function for the specified real argument.')
@functionAttribute('erfc')
@functionSignatureAttribute('real value')
@exampleUsageAttribute('erfc(0)', '1')
@exampleUsageAttribute('erfc(1)', '0.157299207050285')
export class ComplementaryErrorFuncExpression extends UnaryExpression<ComplexResult> {
  constructor(subExpression: Expression<ComplexResult>) {
    super(subExpression);
  }

  public evaluate(): ComplexResult {
    return Complex.fromReal(ProbabilityIntegrals.erfc(ExprHelper.evaluateAsReal(this.subExpression)));
  }
}


export default [
  FactorialFuncExpression,
  CombinationsFuncExpression,
  PermutationsFuncExpression,
  FibonacciFuncExpression,
  GcdFuncExpression,
  LcmFuncExpression,
  ErrorFuncExpression,
  ComplementaryErrorFuncExpression
];
