import { ExpressionTokenizer } from './expression-tokenizer';
import { Token } from './token';
import { TokenType } from './token-type';

export class StandardExpressionTokenizer implements ExpressionTokenizer {
  private static readonly operators: string[] = [
    '+', '-', '*', '/', '%', '^', '**', '!', '√',
    ',', ';',
    '(', ')', '{', '}', '[', ']',
    '<', '<=', '>', '>=', '<>', '==',
    '||', '&&',
    '|', '&', '<<', '>>',
  ].sort(StandardExpressionTokenizer.compareOperators);

  private static compareOperators(x: string, y: string): number {
    return y.length - x.length;
  }

  private static isWhiteSpace(char: string): boolean {
    return char === ' ' || char === '\t';
  }

  private static isDigit(char: string): boolean {
    return char >= '0' && char <= '9';
  }

  private static isSign(char: string): boolean {
    return char === '+' || char === '-';
  }

  private static isLetter(char: string): boolean {
    return (char >= 'a' && char <= 'z') || (char >= 'A' && char <= 'Z');
  }

  private static isLetterOrDigit(char: string): boolean {
    return StandardExpressionTokenizer.isDigit(char) ||
           StandardExpressionTokenizer.isLetter(char);
  }

  public getTokens(expression: string): Token[] {
    if (!expression || !expression.trim()) {
      throw new Error('The expression can\'t be empty.');
    }

    let idx = 0;
    const len = expression.length;
    const tokens: Token[] = [];

    while (idx <= len) {
      let tokenType = TokenType.End;
      let tokenValue = '';

      // Skipping white space characters
      while (idx < len && StandardExpressionTokenizer.isWhiteSpace(expression[idx])) {
        idx++;
      }

      if (idx === len) {
        tokenType = TokenType.End;
        tokenValue = '$';
        tokens.push(new Token(tokenValue, tokenType));
        break;
      }

      // Token type is Scalar
      if (StandardExpressionTokenizer.isDigit(expression[idx]) || expression[idx] === '.') {
        tokenType = TokenType.Scalar;
        while (StandardExpressionTokenizer.isLetterOrDigit(expression[idx]) ||
              (expression[idx] === '.') ||
              (tokenValue.length > 0 && StandardExpressionTokenizer.isSign(expression[idx]) && expression[idx - 1].toLowerCase() === 'e')) {
          tokenValue += expression[idx++];
          if (idx >= len) {
            break;
          }
        }
      // Token type is Operator
      } else if (tokenValue = this.getOperator(expression, idx)) {
        tokenType = TokenType.Operator;
        idx += tokenValue.length;
      // Token type is function or constant or variable
      } else if (StandardExpressionTokenizer.isLetter(expression[idx]) || expression[idx] === '_') {
        while (StandardExpressionTokenizer.isLetterOrDigit(expression[idx]) || expression[idx] === '_') {
          tokenValue += expression[idx++];
          if (idx >= len) {
            break;
          }
        }

        if (idx < len && expression[idx] === '(') {
          tokenType = TokenType.Function;
        } else {
          tokenType = TokenType.Identifier;
        }
      } else {
        throw new SyntaxError(`Invalid character '${expression[idx]}'.`);
      }

      tokens.push(new Token(tokenValue, tokenType));
    }

    return tokens;
  }

  protected getOperator(expression: string, startIndex: number): string {
    const substr = expression.substring(startIndex);

    for (const op of StandardExpressionTokenizer.operators) {
      if (substr.startsWith(op)) {
        return op;
      }
    }

    return '';
  }
}
