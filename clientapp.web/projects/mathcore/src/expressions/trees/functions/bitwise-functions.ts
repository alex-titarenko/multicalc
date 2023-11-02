import { displayNameAttribute } from '../metadata/display-name.attribute';
import { categoryAttribute } from '../metadata/category.attribute';
import { descriptionAttribute } from '../metadata/description.attribute';
import { functionSignatureAttribute } from '../metadata/function-signature.attribute';
import { exampleUsageAttribute } from '../metadata/example-usage.attribute';
import { Categories } from './categories';
import { Complex } from 'mathcore/complex';
import { Expression } from '../expression';
import { UnaryExpression } from '../unary-expression';
import { MultiaryExpression } from '../multiary-expression';
import { ComplexResult } from '../builders/complex-expression-tree-builder';
import { ExprHelper } from './expr-helper';
import { functionAttribute } from '../metadata/function.attribute';

@displayNameAttribute('Bitwise NOT')
@categoryAttribute(Categories.Bitwise)
@descriptionAttribute('Bitwise NOT operator for an integer number.')
@functionAttribute('not')
@functionSignatureAttribute('integer n')
@exampleUsageAttribute('not(1)', '-2')
@exampleUsageAttribute('not(5)', '-6')
export class NotExpression extends UnaryExpression<ComplexResult> {
  constructor(subExpression: Expression<ComplexResult>) {
    super(subExpression);
  }

  public evaluate(): ComplexResult {
    const arg = ExprHelper.evaluateAsInteger(this.subExpression);

    // tslint:disable-next-line:no-bitwise
    const result = ~arg;
    return Complex.fromReal(result);
  }
}

@displayNameAttribute('Bitwise OR')
@categoryAttribute(Categories.Bitwise)
@descriptionAttribute('Bitwise OR operator for integer numbers.')
@functionAttribute('or')
@functionSignatureAttribute('integer n1', 'integer n2', '...')
@exampleUsageAttribute('or(0, 0)', '0')
@exampleUsageAttribute('or(0, 1)', '1')
@exampleUsageAttribute('or(2, 4)', '6')
export class OrExpression extends MultiaryExpression<ComplexResult> {
  constructor(...subExpressions: Expression<ComplexResult>[]) {
    super(...subExpressions);
  }

  public evaluate(): ComplexResult {
    const args = this.expressions.map(arg => ExprHelper.evaluateAsInteger(arg));

    let result = args[0];

    for (let i = 1; i < args.length; i++) {
      // tslint:disable-next-line:no-bitwise
      result = result | args[i];
    }

    return Complex.fromReal(result);
  }
}

@displayNameAttribute('Bitwise AND')
@categoryAttribute(Categories.Bitwise)
@descriptionAttribute('Bitwise AND operator for integer numbers.')
@functionAttribute('and')
@functionSignatureAttribute('integer n1', 'integer n2', '...')
@exampleUsageAttribute('and(0, 0)', '0')
@exampleUsageAttribute('and(0, 1)', '0')
@exampleUsageAttribute('and(2, 7)', '2')
export class AndExpression extends MultiaryExpression<ComplexResult> {
  constructor(...subExpressions: Expression<ComplexResult>[]) {
    super(...subExpressions);
  }

  public evaluate(): ComplexResult {
    const args = this.expressions.map(arg => ExprHelper.evaluateAsInteger(arg));

    let result = args[0];

    for (let i = 1; i < args.length; i++) {
      // tslint:disable-next-line:no-bitwise
      result = result & args[i];
    }

    return Complex.fromReal(result);
  }
}

@displayNameAttribute('Bitwise XOR')
@categoryAttribute(Categories.Bitwise)
@descriptionAttribute('Bitwise XOR operator for integer numbers.')
@functionAttribute('xor')
@functionSignatureAttribute('integer n1', 'integer n2', '...')
@exampleUsageAttribute('xor(0, 0)', '0')
@exampleUsageAttribute('xor(0, 1)', '1')
@exampleUsageAttribute('xor(2, 7)', '5')
export class XorExpression extends MultiaryExpression<ComplexResult> {
  constructor(...subExpressions: Expression<ComplexResult>[]) {
    super(...subExpressions);
  }

  public evaluate(): ComplexResult {
    const args = this.expressions.map(arg => ExprHelper.evaluateAsInteger(arg));

    let result = args[0];

    for (let i = 1; i < args.length; i++) {
      // tslint:disable-next-line:no-bitwise
      result = result ^ args[i];
    }

    return Complex.fromReal(result);
  }
}

@displayNameAttribute('Left shift')
@categoryAttribute(Categories.Bitwise)
@descriptionAttribute('Left shift operator for integer numbers.')
@functionAttribute('lsh')
@functionSignatureAttribute('integer n1', 'integer n2', '...')
@exampleUsageAttribute('lsh(2, 3)', '16')
@exampleUsageAttribute('lsh(1, 5)', '32')
export class LeftShiftExpression extends MultiaryExpression<ComplexResult> {
  constructor(...subExpressions: Expression<ComplexResult>[]) {
    super(...subExpressions);
  }

  public evaluate(): ComplexResult {
    const args = this.expressions.map(arg => ExprHelper.evaluateAsInteger(arg));

    let result = args[0];

    for (let i = 1; i < args.length; i++) {
      // tslint:disable-next-line:no-bitwise
      result = result << args[i];
    }

    return Complex.fromReal(result);
  }
}

@displayNameAttribute('Right shift')
@categoryAttribute(Categories.Bitwise)
@descriptionAttribute('Right shift operator for integer numbers.')
@functionAttribute('rsh')
@functionSignatureAttribute('integer n1', 'integer n2', '...')
@exampleUsageAttribute('rsh(17, 3)', '2')
@exampleUsageAttribute('rsh(167, 3, 2)', '5')
export class RightShiftExpression extends MultiaryExpression<ComplexResult> {
  constructor(...subExpressions: Expression<ComplexResult>[]) {
    super(...subExpressions);
  }

  public evaluate(): ComplexResult {
    const args = this.expressions.map(arg => ExprHelper.evaluateAsInteger(arg));

    let result = args[0];

    for (let i = 1; i < args.length; i++) {
      // tslint:disable-next-line:no-bitwise
      result = result >> args[i];
    }

    return Complex.fromReal(result);
  }
}

export default [
  NotExpression,
  OrExpression,
  AndExpression,
  XorExpression,
  LeftShiftExpression,
  RightShiftExpression
];
