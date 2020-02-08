export interface Token {
  value: string;
  type: TokenType;
}

export type Expression = Token[];

export enum TokenType {
  Default = 'default',
  Operator = 'operator',
}
