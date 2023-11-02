import { Expression } from '../expression';
import { ExpressionTreeBuilderOptions } from './expression-tree-builder-options';

export interface FunctionFactory<T> {
  createFunction(functionName: string, args: Expression<T>[], options?: ExpressionTreeBuilderOptions): Expression<T>;
}
