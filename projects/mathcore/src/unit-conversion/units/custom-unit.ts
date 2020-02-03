import { Decimal } from '../../decimal';
import { Func } from '../../func';
import { Unit } from './unit';

export class CustomUnit extends Unit {
  public readonly fromBase: Func<Decimal>;
  public readonly toBase: Func<Decimal>;

  constructor(name: string, plural: string, symbol: string, fromBase: Func<Decimal>, toBase: Func<Decimal>) {
    super(name, plural, symbol);

    this.fromBase = fromBase;
    this.toBase = toBase;
  }

  public convert(sourceValue: Decimal, outputUnit: Unit): Decimal {
    return (<CustomUnit>outputUnit).fromBase(this.toBase(sourceValue));
  }
}
