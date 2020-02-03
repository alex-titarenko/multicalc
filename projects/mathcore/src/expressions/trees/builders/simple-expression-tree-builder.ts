import { ExpressionTreeBuilder } from './expression-tree-builder';
import { ExpressionTreeBuilderOptions } from './expression-tree-builder-options';
import { ExpressionNormalizer } from './expression-normalizer';
import { StandardExpressionNormalizer } from './standard-expression-normalizer';
import { ExpressionTokenizer } from 'mathcore/expressions/tokenize/expression-tokenizer';
import { StandardExpressionTokenizer } from 'mathcore/expressions/tokenize/standard-expression-tokenizer';
import { ConstantFactory } from './constant-factory';
import { FunctionFactory } from './function-factory';
import { Expression } from '../expression';
import { ScalarExpression } from '../scalar-expression';
import { UnaryExpression } from '../unary-expression';
import { UnaryPlusExpression } from '../unary-plus-expression';
import { BinaryExpression } from '../binary-expression';
import { DivExpression } from '../div-expression';
import { VariableExpression } from '../variable-expression';
import { Token } from 'mathcore/expressions/tokenize/token';
import { Enumerator } from 'mathcore/helpers/enumerator';
import { TokenType } from 'mathcore/expressions/tokenize/token-type';

export interface Variables<T> {
  [key: string]: VariableExpression<T>;
}

export class TreeBuilderBag<T> {
  variables: Variables<T> = {};
  options: ExpressionTreeBuilderOptions;
}

interface UnaryOperatorHandlers<T> {
  [key: string]: (tokens: Enumerator<Token>, bag: TreeBuilderBag<T>) => Expression<T>;
}

export abstract class SimpleExpressionTreeBuilder<T> implements ExpressionTreeBuilder<T> {
  public normalizer: ExpressionNormalizer;
  public tokenizer: ExpressionTokenizer;
  public constantFactory: ConstantFactory<T>;
  public functionFactory: FunctionFactory<T>;
  public unaryOperatorHandlers: UnaryOperatorHandlers<T>;

  constructor() {
    this.normalizer = new StandardExpressionNormalizer();
    this.tokenizer = new StandardExpressionTokenizer();

    this.unaryOperatorHandlers = {
      '-': (tokens, bag) => this.createUnaryMinusExpression(this.pow(tokens, bag)),
      '+': (tokens, bag) => new UnaryPlusExpression<T>(this.pow(tokens, bag)),
      '√': (tokens, bag) => this.createSqrtExpression(this.pow(tokens, bag)),
      '(': (tokens, bag) => {
        const bracketsSubExpr = this.addSub(tokens, bag);
        if (tokens.current.value === ')') {
          tokens.moveNext();
          return bracketsSubExpr;
        } else {
          throw new SyntaxError('\")\" expected.');
        }
      }
    };
  }

  private static isParameterDelimiter(s: string): boolean {
    return s === ',';
  }

  private static isFunctionEnd(s: string): boolean {
    return s === ')';
  }

  public buildTree(expression: string, options?: ExpressionTreeBuilderOptions): Expression<T> {
    const normalizedExpression = options.normalizeExpression ? this.normalizer.normalize(expression) : expression;
    const tokens = new Enumerator<Token>(this.tokenizer.getTokens(normalizedExpression));
    const bag: TreeBuilderBag<T> = new TreeBuilderBag();
    bag.options = options;

    const result = this.addSub(tokens, bag);

    if (tokens.moveNext()) {
      throw new SyntaxError('An unexpected token in the end.');
    }

    return result;
  }

  protected addSub(tokens: Enumerator<Token>, bag: TreeBuilderBag<T>): Expression<T> {
    let left = this.multDiv(tokens, bag);

    while (true) {
      switch (tokens.current.value) {
        case '+':
          const add = this.createAddExpression();
          add.leftExpression = left;
          add.rightExpression = this.multDiv(tokens, bag);
          left = add;
          break;

        case '-':
          const sub = this.createSubExpression();
          sub.leftExpression = left;
          sub.rightExpression = this.multDiv(tokens, bag);
          left = sub;
          break;

        default:
          return left;
      }
    }
  }

  protected multDiv(tokens: Enumerator<Token>, bag: TreeBuilderBag<T>): Expression<T> {
    let left = this.pow(tokens, bag);

    while (true) {
      switch (tokens.current.value) {
        case '*':
          const mult = this.createMultExpression();
          mult.leftExpression = left;
          mult.rightExpression = this.pow(tokens, bag);
          left = mult;
          break;

        case '/':
          const div = this.createDivExpression();
          div.leftExpression = left;
          div.rightExpression = this.pow(tokens, bag);
          div.errorOnDivideByZero = bag.options.errorOnDivideByZero;
          left = div;
          break;

        case '%':
          const percent = this.createPercentExpression();
          percent.leftExpression = left;
          percent.rightExpression = this.pow(tokens, bag);
          left = percent;
          break;

        default:
          return left;
      }
    }
  }

  protected pow(tokens: Enumerator<Token>, bag: TreeBuilderBag<T>): Expression<T> {
    let left = this.unary(tokens, bag);

    while (true) {
      if (tokens.current.value === '^') {
        const pow = this.createPowExpression();
        pow.leftExpression = left;
        pow.rightExpression = this.pow(tokens, bag);
        left = pow;
      } else {
        return left;
      }
    }
  }

  protected unary(tokens: Enumerator<Token>, bag: TreeBuilderBag<T>): Expression<T> {
    tokens.moveNext();

    switch (tokens.current.tokenType) {
      case TokenType.Scalar:
        const subExpr = this.parseScalarValue(tokens.current.value);
        tokens.moveNext();
        return subExpr;

      case TokenType.Identifier:
        const identifierName = tokens.current.value;
        tokens.moveNext();

        const consExpr = this.constantFactory.createConstant(identifierName);
        if (consExpr !== null) {
          return consExpr;
        }

        let varExpr: VariableExpression<T> = bag.variables[identifierName];
        if (varExpr === undefined) {
            varExpr = new VariableExpression<T>(identifierName);
            bag.variables[identifierName] = varExpr;
        }
        return varExpr;

      case TokenType.Operator:
        const func = this.unaryOperatorHandlers[tokens.current.value];
        if (func !== undefined) {
          return func(tokens, bag);
        } else {
          throw new SyntaxError(`Incorrect operator \"${tokens.current.value}\".`);
        }

      case TokenType.Function:
        const funcName = tokens.current.value;
        const args: Expression<T>[] = [];

        tokens.moveNext();
        if (tokens.current.value !== '(') {
          throw this.throwExpectedException('(');
        }

        args.push(this.addSub(tokens, bag));
        while (SimpleExpressionTreeBuilder.isParameterDelimiter(tokens.current.value)) {
          args.push(this.addSub(tokens, bag));
        }

        if (!SimpleExpressionTreeBuilder.isFunctionEnd(tokens.current.value)) {
          throw this.throwExpectedException(')');
        }

        tokens.moveNext();
        return this.functionFactory.createFunction(funcName, args, bag.options);

      default:
        throw new SyntaxError('An unexpected token in the end.');
    }
  }


  protected abstract createAddExpression(): BinaryExpression<T>;

  protected abstract createSubExpression(): BinaryExpression<T>;

  protected abstract createMultExpression(): BinaryExpression<T>;

  protected abstract createDivExpression(): DivExpression<T>;

  protected abstract createPercentExpression(): BinaryExpression<T>;

  protected abstract createPowExpression(): BinaryExpression<T>;

  protected abstract createSqrtExpression(subExpression: Expression<T>): UnaryExpression<T>;

  protected abstract createUnaryMinusExpression(subExpression: Expression<T>): UnaryExpression<T>;

  protected abstract parseScalarValue(s: string): ScalarExpression<T>;

  private throwExpectedException(s: string): Error {
    return new SyntaxError(`'${s}' expected.`);
  }
}
