import 'reflect-metadata';

const nameKey = 'displayName:Name';

export function displayNameAttribute(displayName: string) {
  return (ctor: Function) => {
    Reflect.defineMetadata(nameKey, displayName, ctor);
  };
}

displayNameAttribute.getName = function(target: Object): string {
  return Reflect.getMetadata(nameKey, target);
};
