import { Expression } from '../expression';
import { ExpressionTreeBuilderOptions } from './expression-tree-builder-options';

export interface ExpressionTreeBuilder<T> {
  buildTree(expression: string, options?: ExpressionTreeBuilderOptions): Expression<T>;
}
