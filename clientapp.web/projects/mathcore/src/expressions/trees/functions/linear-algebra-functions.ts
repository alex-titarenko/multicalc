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
import { BinaryExpression } from '../binary-expression';
import { CMatrix } from 'mathcore/linear-algebra/cmatrix';


@displayNameAttribute('Linear system solve')
@categoryAttribute(Categories.LinearAlgebra)
@sectionAttribute(Sections.SolveAndInverse)
@descriptionAttribute('Calculates the solution of the linear system.')
@functionAttribute('lsolve')
@functionSignatureAttribute('complex matrix a', 'complex vector b')
@exampleUsageAttribute('lsolve([3, 2, -1; 2, -2, 4; -1, 1/2, -1], [1; -2; 0])', '[1; -2; -2]')
export class LinearSolveFuncExpression extends BinaryExpression<ComplexResult> {
  constructor(aExpression: Expression<ComplexResult>, bExpression: Expression<ComplexResult>) {
    super(aExpression, bExpression);
  }

  public evaluate(): ComplexResult {
    return CMatrix.solve(
      ExprHelper.evaluateAsCMatrix(this.leftExpression),
      ExprHelper.evaluateAsCMatrix(this.rightExpression));
  }
}


export default [
  LinearSolveFuncExpression
];
