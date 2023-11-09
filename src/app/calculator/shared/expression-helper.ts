import { Expression, Token, TokenType } from './expression.model';

import { AnswerFormat } from './answer-format.model';
import { CMatrix } from 'mathcore/linear-algebra/cmatrix';
import { Complex } from 'mathcore/complex';
import { NumericUtils } from 'mathcore/numeric-utils';

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
    let realExpr = ExpressionHelper.stringToExpression(format(Math.abs(c.real)));
    if (c.real < 0) {
      realExpr = [opToken('-'), ...realExpr];
    }
    const absImagExpr = [
      ...ExpressionHelper.stringToExpression(format(Math.abs(c.imag))),
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

  public static getTokenType(token: string): TokenType {
    if (this.isOperatorToken(token)) {
      return TokenType.Operator;
    }

    return TokenType.Default;
  }

  public static isValidExpressionString(str: string) {
    return [...str].every(ch => this.isValidExpressionCharacter(ch));
  }

  public static isValidExpressionCharacter(key: string): boolean {
    if (key.length > 1) {
      return false;
    }

    if (key >= '0' && key <= '9') {
      return true;
    }

    if ((key >= 'a' && key <= 'z') || (key >= 'A' && key <= 'Z')) {
      return true;
    }

    if (this.isOperatorToken(key)) {
      return true;
    }

    switch (key) {
      case ',':
      case '.':
      case ';':
      case ':':
      case '(':
      case ')':
      case '[':
      case ']':
      case '#':
      case ' ':
        return true;

      default:
        return false;
    }
  }

  public static stringToExpression(str: string): Expression {
    return [...str].map(ch => ({ value: ch, type: this.getTokenType(ch) }));
  }

  private static formatComplex(c: Complex, answerFormat: AnswerFormat): Expression {
    const formattedObj = NumericUtils.complexZeroThreshold(c, answerFormat.complexThreshold, answerFormat.zeroThreshold);

    return ExpressionHelper.complexToExpression(
      formattedObj,
      n => NumericUtils.formatNumber(n, answerFormat.decimalPlaces, answerFormat.numericFormat, false));
  }

  private static isOperatorToken(token: string): boolean {
    switch (token) {
      case '*':
      case '/':
      case '+':
      case '-':
      case '%':
      case '^':
      case '√':
        return true;

      default:
        return false;
    }
  }
}
