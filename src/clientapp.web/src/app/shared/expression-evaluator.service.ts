import { Injectable } from '@angular/core';
import { ComplexExpressionTreeBuilder, ComplexResult } from 'mathcore/expressions/trees/builders/complex-expression-tree-builder';
import { ConstantFlyweightFactory } from 'mathcore/expressions/trees/builders/constant-flyweight-factory';
import { StandardFunctionFactory } from 'mathcore/expressions/trees/builders/standard-function-factory';
import constants from 'mathcore/expressions/trees/constants/constants';
import functions from 'mathcore/expressions/trees/functions';
import { ExpressionTreeBuilderOptions } from 'mathcore/expressions/trees/builders/expression-tree-builder-options';
import { FunctionMetadata } from 'mathcore/expressions/trees/metadata/function-metadata';
import { FunctionsMetadataProvider } from 'mathcore/expressions/trees/metadata/functions-metadata.provider';
import { ParametricFunctionCreator } from 'root/projects/mathcore/src/expressions/trees/builders/parametric-function-creator';

@Injectable()
export class ExpressionEvaluatorService {
  protected readonly treeBuilder: ComplexExpressionTreeBuilder;
  protected readonly functionsMetadataProvider: FunctionsMetadataProvider;

  constructor() {
    const constantFactory = new ConstantFlyweightFactory<ComplexResult>();
    constantFactory.load(constants);

    const functionFactory = new StandardFunctionFactory<ComplexResult>();
    functionFactory.load(functions);

    this.treeBuilder = new ComplexExpressionTreeBuilder();
    this.treeBuilder.constantFactory = constantFactory;
    this.treeBuilder.functionFactory = functionFactory;

    this.functionsMetadataProvider = functionFactory;
  }

  public evaluate(expression: string, options?: ExpressionTreeBuilderOptions): any {
    const tree = this.treeBuilder.buildTree(expression, options);
    return tree.evaluate();
  }

  public buildRealFunction(expression: string, varName: string = 'x'): (x: number) => number {
    const exprTree = this.treeBuilder.buildTree(expression, new ExpressionTreeBuilderOptions());
    const func = ParametricFunctionCreator.createRealFunctionFromComplexExpression(exprTree, varName);
    return func;
  }

  public getFunctionsMetadata(): FunctionMetadata[] {
    return this.functionsMetadataProvider.getMetadata();
  }
}
