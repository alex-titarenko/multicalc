import { AngleMode } from 'mathcore/convert';

export class ExpressionTreeBuilderOptions {
  public normalizeExpression?: boolean = false;
  public errorOnDivideByZero?: boolean = false;
  public angleMode?: AngleMode = AngleMode.Radian;
}
