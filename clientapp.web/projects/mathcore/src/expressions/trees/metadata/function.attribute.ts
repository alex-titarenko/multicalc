import 'reflect-metadata';

const nameKey = 'function:Name';
const aliasesKey = 'function:Aliases';

export function functionAttribute(name: string, ...aliases: string[]) {
  return (ctor: Function) => {
    Reflect.defineMetadata(nameKey, name, ctor);
    Reflect.defineMetadata(aliasesKey, aliases, ctor);
  };
}

functionAttribute.getName = function(target: Object): string {
  return Reflect.getMetadata(nameKey, target);
};

functionAttribute.getAliases = function(target: Object): string[] {
  return Reflect.getMetadata(aliasesKey, target);
};
