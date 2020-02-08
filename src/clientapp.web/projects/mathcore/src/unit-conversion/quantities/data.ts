import { Quantity } from './quantity';
import { Unit } from './../units/unit';
import { LinearUnit } from './../units/linear-unit';
import { quantityAttribute } from './annotation/quantity.attribute';

@quantityAttribute('GB', 'MB')
export class Data extends Quantity {
  public static readonly Bit: LinearUnit = new LinearUnit('Bit', 'Bits', 'b', 1);
  public static readonly Byte: LinearUnit = new LinearUnit('Byte', 'Bytes', 'B', 8);
  public static readonly Kilobit: LinearUnit = new LinearUnit('Kilobit', 'Kilobits', 'kb', 1024);
  public static readonly Kilobyte: LinearUnit = new LinearUnit('Kilobyte', 'Kilobytes', 'KB', 8192);
  public static readonly Megabit: LinearUnit = new LinearUnit('Megabit', 'Megabits', 'mb', 1048576);
  public static readonly Megabyte: LinearUnit = new LinearUnit('Megabyte', 'Megabytes', 'MB', 8388608);
  public static readonly Gigabit: LinearUnit = new LinearUnit('Gigabit', 'Gigabits', 'gb', 1073741824);
  public static readonly Gigabyte: LinearUnit = new LinearUnit('Gigabyte', 'Gigabytes', 'GB', 8589934592);
  public static readonly Terabit: LinearUnit = new LinearUnit('Terabit', 'Terabits', 'tb', 1099511627776);
  public static readonly Terabyte: LinearUnit = new LinearUnit('Terabyte', 'Terabytes', 'TB', 8796093022208);
  public static readonly Petabit: LinearUnit = new LinearUnit('Petabit', 'Petabits', 'pb', 1125899906842624);
  public static readonly Petabyte: LinearUnit = new LinearUnit('Petabyte', 'Petabytes', 'PB', 9007199254740992);

  public readonly name: string = 'Data';

  public readonly units: Unit[] = [
    Data.Bit,
    Data.Byte,
    Data.Kilobit,
    Data.Kilobyte,
    Data.Megabit,
    Data.Megabyte,
    Data.Gigabit,
    Data.Gigabyte,
    Data.Terabit,
    Data.Terabyte,
    Data.Petabit,
    Data.Petabyte
  ];
}
