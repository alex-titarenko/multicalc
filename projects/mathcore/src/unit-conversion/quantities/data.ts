import { LinearUnit } from './../units/linear-unit';
import { Quantity } from './quantity';
import { Unit } from './../units/unit';
import { quantityAttribute } from './annotation/quantity.attribute';

@quantityAttribute('GB', 'MB')
export class Data extends Quantity {
  public static readonly Bit: LinearUnit = new LinearUnit('Bit', 'Bits', 'b', 1);
  public static readonly Kilobit: LinearUnit = new LinearUnit('Kilobit', 'Kilobits', 'kb', 1_000);
  public static readonly Kibibit: LinearUnit = new LinearUnit('Kibibit', 'Kibibits', 'kib', 1_024);
  public static readonly Megabit: LinearUnit = new LinearUnit('Megabit', 'Megabits', 'mb', 1_000_000);
  public static readonly Mebibit: LinearUnit = new LinearUnit('Mebibit', 'Mebibits', 'mib', 1_048_576);
  public static readonly Gigabit: LinearUnit = new LinearUnit('Gigabit', 'Gigabits', 'gb', 1_000_000_000);
  public static readonly Gibibit: LinearUnit = new LinearUnit('Gibibit', 'Gibibits', 'gib', 1_073_741_824);
  public static readonly Terabit: LinearUnit = new LinearUnit('Terabit', 'Terabits', 'tb', 1_000_000_000_000);
  public static readonly Tebibit: LinearUnit = new LinearUnit('Tebibit', 'Tebibits', 'tib', 1_099_511_627_776);
  public static readonly Petabit: LinearUnit = new LinearUnit('Petabit', 'Petabits', 'pb', 1_000_000_000_000_000);
  public static readonly Pebibit: LinearUnit = new LinearUnit('Pebibit', 'Pebibits', 'pib', 1_125_899_906_842_624);

  public static readonly Byte: LinearUnit = new LinearUnit('Byte', 'Bytes', 'B', 8);
  public static readonly Kilobyte: LinearUnit = new LinearUnit('Kilobyte', 'Kilobytes', 'KB', 8_000);
  public static readonly Kibibyte: LinearUnit = new LinearUnit('Kibibyte', 'Kibibytes', 'KiB', 8_192);
  public static readonly Megabyte: LinearUnit = new LinearUnit('Megabyte', 'Megabytes', 'MB', 8_000_000);
  public static readonly Mebibyte: LinearUnit = new LinearUnit('Mebibyte', 'Mebibytes', 'MiB', 8_388_608);
  public static readonly Gigabyte: LinearUnit = new LinearUnit('Gigabyte', 'Gigabytes', 'GB', 8_000_000_000);
  public static readonly Gibibyte: LinearUnit = new LinearUnit('Gibibyte', 'Gibibytes', 'GiB', 8_589_934_592);
  public static readonly Terabyte: LinearUnit = new LinearUnit('Terabyte', 'Terabytes', 'TB', 8_000_000_000_000);
  public static readonly Tebibyte: LinearUnit = new LinearUnit('Tebibyte', 'Tebibytes', 'TiB', 8_796_093_022_208);
  public static readonly Petabyte: LinearUnit = new LinearUnit('Petabyte', 'Petabytes', 'PB', 8_000_000_000_000_000);
  public static readonly Pebibyte: LinearUnit = new LinearUnit('Pebibyte', 'Pebibytes', 'PiB', 9_007_199_254_740_992);

  public readonly name: string = 'Data';

  public readonly units: Unit[] = [
    Data.Bit,
    Data.Kilobit,
    Data.Kibibit,
    Data.Megabit,
    Data.Mebibit,
    Data.Gigabit,
    Data.Gibibit,
    Data.Terabit,
    Data.Tebibit,
    Data.Petabit,
    Data.Pebibit,

    Data.Byte,
    Data.Kilobyte,
    Data.Kibibyte,
    Data.Megabyte,
    Data.Mebibyte,
    Data.Gigabyte,
    Data.Gibibyte,
    Data.Terabyte,
    Data.Tebibyte,
    Data.Petabyte,
    Data.Pebibyte
  ];
}
