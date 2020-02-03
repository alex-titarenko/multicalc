import { ExpressionNormalizer } from './expression-normalizer';

export class StandardExpressionNormalizer implements ExpressionNormalizer {
  private static readonly binaryOperators = ['-', '+', '*', '/', '%', '^'];

  public normalize(expression: string): string {
    let normalizedExpression = expression;

    // Trim operators at the end
    const endsWithBinaryOp = StandardExpressionNormalizer.binaryOperators.some(op => expression.endsWith(op));

    if (endsWithBinaryOp) {
      normalizedExpression = normalizedExpression.substr(0, normalizedExpression.length - 1);
    }

    // Close missing parentheses
    const openParentheses = (normalizedExpression.match(/\(/g) || []).length;
    const closedParentheses = (normalizedExpression.match(/\)/g) || []).length;

    if (openParentheses > closedParentheses) {
      normalizedExpression = normalizedExpression + ')'.repeat(openParentheses - closedParentheses);
    }

    // Close missing square bracket
    const openSquareBrackets = (normalizedExpression.match(/\[/g) || []).length;
    const closedSquareBrackets = (normalizedExpression.match(/\]/g) || []).length;

    if ((openSquareBrackets - closedSquareBrackets) === 1) {
      normalizedExpression = normalizedExpression + ']';
    }

    return normalizedExpression;
  }
}
