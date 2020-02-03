export class FunctionSignature {
  public description: string;
  public readonly argumentCount: number;

  public get hasVariableArgumentNumber(): boolean {
    return this.args !== null &&
           this.args.some(x => true) &&
           this.args[this.args.length - 1].name === '...';
  }

  constructor(public readonly args: Argument[]) {
    if (this.args != null) {
      if (this.hasVariableArgumentNumber) {
        this.argumentCount = -1;
      } else {
        this.argumentCount = this.args.length;
      }
    }
  }
}

export class Argument {
  constructor(
    public readonly type: string,
    public readonly name: string,
    public knownType: KnownType = KnownType.Unknown) {
  }

  public static parse(str: string): Argument {
    const parts = str.split(' ').filter(x => x !== '');
    const name = parts.pop();
    const type = parts.join(' ');

    return new Argument(type, name, Argument.getKnownArgType(type));
  }

  private static getKnownArgType(type: string): KnownType {
    switch (type.toUpperCase()) {
      case 'VARIABLE':
        return KnownType.Variable;

      case 'EXPRESSION':
        return KnownType.Expression;

      default:
        return KnownType.Unknown;
    }
  }
}

export enum KnownType {
  Variable,
  Expression,
  Unknown
}
