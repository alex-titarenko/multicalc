import 'reflect-metadata';
import { ExampleUsage } from './example-usage';

const exampleUsagesKey = 'exampleUsages';

export function exampleUsageAttribute(expression: string, result: string, canMultipleResults: boolean = false) {
  return (ctor: Function) => {
    const newUsage = new ExampleUsage(expression, result, canMultipleResults);
    const usages = exampleUsageAttribute.getUsages(ctor);
    usages.push(newUsage);

    Reflect.defineMetadata(exampleUsagesKey, usages, ctor);
  };
}

exampleUsageAttribute.getUsages = function(target: Object): ExampleUsage[] {
  return Reflect.getMetadata(exampleUsagesKey, target) || [];
};
