import { ConstantFactory } from './constant-factory';
import { ConstantExpression } from '../constant-expression';
import { constantAttribute } from '../metadata/constant.attribute';

interface Constants {
  [key: string]: Function;
}

interface ConstantsCache<T> {
  [key: string]: ConstantExpression<T>;
}

export class ConstantFlyweightFactory<T> implements ConstantFactory<T> {
  public constants: Constants = {};
  private constantsCache: ConstantsCache<T> = {};

  public createConstant(constantName: string): ConstantExpression<T> {
    let constant: ConstantExpression<T> = null;

    const constantClass = this.constants[constantName];

    if (constantClass !== undefined) {
      constant = this.constantsCache[constantName];

      if (constant === undefined) {
        constant = <ConstantExpression<T>>new constantClass.prototype.constructor();
        this.constantsCache[constantName] = constant;
      }
    }

    return constant;
  }

  public load(constantTypes: Function[]) {
    this.constants = {};

    constantTypes.forEach(constantType => {
      const name = constantAttribute.getName(constantType);

      if (name === undefined) {
        throw new Error('constantAttribute is required for ConstantExpression.');
      }

      this.constants[name] = constantType;
    });
  }
}
