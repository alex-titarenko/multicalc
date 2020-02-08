import 'reflect-metadata';

const descriptionKey = 'description:Text';

export function descriptionAttribute(description: string) {
  return (ctor: Function) => {
    Reflect.defineMetadata(descriptionKey, description, ctor);
  };
}

descriptionAttribute.getDescription = function(target: Object): string {
  return Reflect.getMetadata(descriptionKey, target);
};
