import 'reflect-metadata';

const nameKey = 'constant:Name';
const valueKey = 'constant:Value';

export function constantAttribute(name: string, value?: string) {
  return (ctor: Function) => {
    Reflect.defineMetadata(nameKey, name, ctor);
    Reflect.defineMetadata(valueKey, value, ctor);
  };
}

constantAttribute.getName = function(target: Object): string {
  return Reflect.getMetadata(nameKey, target);
};

constantAttribute.getValue = function(target: Object): string {
  return Reflect.getMetadata(valueKey, target);
};
