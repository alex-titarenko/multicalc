import 'reflect-metadata';
import { FunctionSignature, Argument } from './function-signature';

const functionSignaturesKey = 'functionSignatures';

export function functionSignatureAttribute(...args: string[]) {
  return (ctor: Function) => {
    const newSignature = new FunctionSignature(args.map(x => Argument.parse(x)));
    const signatures = functionSignatureAttribute.getSignatures(ctor);
    signatures.push(newSignature);

    Reflect.defineMetadata(functionSignaturesKey, signatures, ctor);
  };
}

functionSignatureAttribute.getSignatures = function(target: Object): FunctionSignature[] {
  return Reflect.getMetadata(functionSignaturesKey, target) || [];
};
