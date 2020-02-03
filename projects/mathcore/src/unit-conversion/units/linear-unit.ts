import { Decimal } from '../../decimal';
import { Unit } from './unit';

export class LinearUnit extends Unit {
  public readonly factor: number;

  constructor(name: string, plural: string, symbol: string, factor: number) {
    super(name, plural, symbol);

    this.factor = factor;
  }

  public convert(sourceValue: Decimal, outputUnit: Unit): Decimal {
    return sourceValue.mul(this.factor).div((<LinearUnit>outputUnit).factor);
  }
}
