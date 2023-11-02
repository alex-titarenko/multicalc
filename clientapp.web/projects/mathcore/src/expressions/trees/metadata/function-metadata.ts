import { FunctionSignature } from './function-signature';
import { ExampleUsage } from './example-usage';

export class FunctionMetadata {
  public name: string;
  public displayName: string;
  public category: string;
  public section: string;
  public description: string;
  public signatures: FunctionSignature[] = [];
  public exampleUsages: ExampleUsage[] = [];

  constructor(public readonly functionType: Function) { }

  public getAcceptableSignature(argCount: number): FunctionSignature {
    let signature = this.signatures.find(x => x.argumentCount === argCount);
    if (signature === undefined) {
      signature = this.signatures.find(x => x.argumentCount === -1);
    }

    return signature;
  }

  public toString(): string {
    return this.displayName;
  }
}
