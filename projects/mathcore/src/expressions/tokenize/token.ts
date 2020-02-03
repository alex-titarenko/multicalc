import { TokenType } from './token-type';

export class Token {
  constructor(
    public readonly value: string,
    public readonly tokenType: TokenType
  ) {}

  public equals(token: Token) {
    return this.value === token.value && this.tokenType === token.tokenType;
  }

  public toString(): string {
    return `(Value: ${this.value}, Type: ${this.tokenType})`;
  }
}
