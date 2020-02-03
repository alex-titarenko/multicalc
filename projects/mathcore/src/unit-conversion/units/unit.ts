import { Decimal } from '../../decimal';

export abstract class Unit {
  public readonly name: string;
  public readonly plural: string;
  public readonly symbol: string;

  constructor(name: string, plural: string, symbol: string) {
    this.name = name;
    this.plural = plural;
    this.symbol = symbol;
  }

  public abstract convert(sourceValue: Decimal, outputUnit: Unit): Decimal;

  public toString(): string {
    return this.plural;
  }
}
