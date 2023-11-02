import { Expression } from '../expression';
import { TrigonometricFunctionExpression } from '../trigonometric-function-expression';
import { FunctionFactory } from './function-factory';
import { FunctionMetadata } from '../metadata/function-metadata';
import { FunctionSignature, KnownType } from '../metadata/function-signature';
import { FunctionsMetadataProvider } from '../metadata/functions-metadata.provider';
import { FunctionMetadataProvider } from '../metadata/function-metadata.provider';
import { DefaultFunctionMetadataProvider } from '../metadata/default-function-metadata.provider';
import { VariableExpression } from '../variable-expression';
import { ArgumentError } from 'mathcore/errors/argument-error';
import { ExpressionTreeBuilderOptions } from './expression-tree-builder-options';
import { NumericUtils } from 'mathcore/numeric-utils';

interface Functions {
  [key: string]: FunctionMetadata;
}

export class StandardFunctionFactory<T> implements FunctionFactory<T>, FunctionsMetadataProvider {
  private metadataProvider: FunctionMetadataProvider = new DefaultFunctionMetadataProvider();
  public functions: Functions = {};

  public createFunction(functionName: string, args: Expression<T>[], options?: ExpressionTreeBuilderOptions): Expression<T> {
    const targetFunction = this.functions[functionName];

    if (targetFunction === undefined) {
      throw new SyntaxError(`Function '${functionName}' is not defined.`);
    }

    const signature = targetFunction.getAcceptableSignature(args.length);
    if (signature === undefined) {
      throw new SyntaxError(`Function '${functionName}' with ${args.length} arguments is not defined.`);
    }

    this.processingClosedVariables(signature, args);
    const func = <Expression<T>>new targetFunction.functionType.prototype.constructor(...args);

    if (options !== undefined && func instanceof TrigonometricFunctionExpression) {
      func.angleMode = options.angleMode;
    }

    return func;
  }

  public load(functionTypes: Function[]) {
    this.functions = {};

    functionTypes.forEach(functionType => {
      const metadata = this.metadataProvider.getMetadata(functionType);

      const existingFunction = this.functions[metadata.name];

      if (existingFunction !== undefined) {
        throw new Error(`Function '${existingFunction.name}' is already defined.`);
      }

      this.functions[metadata.name] = metadata;
    });
  }

  public getMetadata(): FunctionMetadata[] {
    const metadata: FunctionMetadata[] = [];

    for (const key in this.functions) {
      if (this.functions.hasOwnProperty(key)) {
        metadata.push(this.functions[key]);
      }
    }

    return metadata;
  }

  private processingClosedVariables(signature: FunctionSignature, args: Expression<T>[]): void {
    const expressionArg = signature.args.find(x => x.knownType === KnownType.Expression);

    if (expressionArg !== undefined) {
      const exprIndex = signature.args.indexOf(expressionArg);
      const expr = args[exprIndex];

      signature.args
        .filter(x => x.knownType === KnownType.Variable)
        .forEach(varArg => {
          const varIndex: number = signature.args.indexOf(varArg);
          const oldVar: VariableExpression<T> = args[varIndex] as VariableExpression<T>;

          if (oldVar !== null) {
            const newVar = this.getClosedVariable(oldVar);
            if (expr instanceof VariableExpression) {
              args[exprIndex] = newVar;
            } else {
              expr.replaceChild(oldVar, newVar);
            }
            args[varIndex] = newVar;
          } else {
            const actualType = args[varIndex].evaluate().constructor.name;
            throw new ArgumentError(`Invalid argument type. Expected 'variable' but found '${actualType}'.`);
          }
        });
    }
  }

  private getClosedVariable(variable: VariableExpression<T>): VariableExpression<T> {
    const newVariableName = `${variable.variableName}__${NumericUtils.generateGuid()}`;
    return new VariableExpression<T>(newVariableName, variable.displayName);
  }
}
