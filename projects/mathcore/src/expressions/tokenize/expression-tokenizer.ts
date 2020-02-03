import { Token } from './token';

export interface ExpressionTokenizer {
  getTokens(expression: string): Token[];
}
