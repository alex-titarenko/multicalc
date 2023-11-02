import { Complex } from 'mathcore/complex';
import { CMatrix } from 'mathcore/linear-algebra/cmatrix';
import { NumericUtils } from 'mathcore/numeric-utils';
import { Token, TokenType, Expression } from './expression.model';
import { AnswerFormat } from './answer-format.model';

function defaultToken(tokenValue: string): Token {
  return { value: tokenValue, type: TokenType.Default };
}

function opToken(tokenValue: string): Token {
  return { value: tokenValue, type: TokenType.Operator };
}

export class ExpressionHelper {
  public static complexResultToExpression(o: any, answerFormat: AnswerFormat): Expression {
    if (o instanceof Complex) {
      return ExpressionHelper.formatComplex(o, answerFormat);
    } else if (o instanceof CMatrix) {
      return ExpressionHelper.matrixToExpression(o, c => ExpressionHelper.formatComplex(c, answerFormat));
    }

    throw new Error(`${o.constructor.name} is not supported type for expression result.`);
  }

  public static complexToExpression(c: Complex, format: (n: number) => string): Expression {
    let realExpr = ExpressionHelper.stringToExpression(format(Math.abs(c.real)), TokenType.Default);
    if (c.real < 0) {
      realExpr = [opToken('-'), ...realExpr];
    }
    const absImagExpr = [
      ...ExpressionHelper.stringToExpression(format(Math.abs(c.imag)), TokenType.Default),
      defaultToken('i')
    ];

    if (c.isZero) {
      return [defaultToken('0')];
    }

    if (c.isReal) {
      return realExpr;
    } else if (c.isImaginary && c.imag < 0) {
      return [opToken('-'), ...absImagExpr];
    } else if (c.isImaginary && c.imag >= 0) {
      return absImagExpr;
    } else if (c.imag < 0) {
      return [...realExpr, opToken('-'), ...absImagExpr];
    } else {
      return [...realExpr, opToken('+'), ...absImagExpr];
    }
  }

  public static matrixToExpression(m: CMatrix, format: (c: Complex) => Expression): Expression {
    const result: Expression = [defaultToken('[')];

    for (let i = 0; i < m.rows; i++) {
      if (i > 0) {
        result.push(defaultToken(';'));
      }
      for (let j = 0; j < m.columns; j++) {
        if (j > 0) {
          result.push(defaultToken(','));
        }
        result.push(...format(m.get(i, j)));
      }
    }

    result.push(defaultToken(']'));

    return result;
  }

  private static formatComplex(c: Complex, answerFormat: AnswerFormat): Expression {
    const formattedObj = NumericUtils.complexZeroThreshold(c, answerFormat.complexThreshold, answerFormat.zeroThreshold);

    return ExpressionHelper.complexToExpression(
      formattedObj,
      n => NumericUtils.formatNumber(n, answerFormat.decimalPlaces, answerFormat.numericFormat, false));
  }

  private static stringToExpression(str: string, tokenType: TokenType): Expression {
    const expression: Expression = [];

    for (let i = 0; i < str.length; i++) {
      expression.push({ value: str[i], type: tokenType });
    }

    return expression;
  }
}
