import 'reflect-metadata';

const sectionKey = 'section:Name';

export function sectionAttribute(section: string) {
  return (ctor: Function) => {
    Reflect.defineMetadata(sectionKey, section, ctor);
  };
}

sectionAttribute.getSection = function(target: Object): string {
  return Reflect.getMetadata(sectionKey, target);
};
