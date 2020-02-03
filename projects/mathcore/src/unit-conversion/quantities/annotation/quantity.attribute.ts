import 'reflect-metadata';

const DefaultInputUnitSymbolKey = 'quantity:DefaultInputUnitSymbol';
const DefaultOutputUnitSymbolKey = 'quantity:DefaultOutputUnitSymbol';

export function quantityAttribute(defaultInputUnitSymbol: string, defaultOutputUnitSymbol: string) {
  return (ctor: Function) => {
    Reflect.defineMetadata(DefaultInputUnitSymbolKey, defaultInputUnitSymbol, ctor);
    Reflect.defineMetadata(DefaultOutputUnitSymbolKey, defaultOutputUnitSymbol, ctor);
  };
}

quantityAttribute.getDefaultInputUnitSymbol = function(target: Object): string {
  return Reflect.getMetadata(DefaultInputUnitSymbolKey, target);
};

quantityAttribute.getDefaultOutputUnitSymbol = function(target: Object): string {
  return Reflect.getMetadata(DefaultOutputUnitSymbolKey, target);
};
