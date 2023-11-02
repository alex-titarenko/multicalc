import { ConstantExpression } from '../constant-expression';

export interface ConstantFactory<T> {
  createConstant(constantName: string): ConstantExpression<T>;
}
