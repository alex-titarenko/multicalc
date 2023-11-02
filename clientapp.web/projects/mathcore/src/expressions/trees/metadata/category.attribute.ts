import 'reflect-metadata';

const categoryKey = 'category:Name';

export function categoryAttribute(category: string) {
  return (ctor: Function) => {
    Reflect.defineMetadata(categoryKey, category, ctor);
  };
}

categoryAttribute.getCategory = function(target: Object): string {
  return Reflect.getMetadata(categoryKey, target);
};
