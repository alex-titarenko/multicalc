import { Quantity } from './quantity';
import { Unit } from './../units/unit';
import { LinearUnit } from './../units/linear-unit';
import { quantityAttribute } from './annotation/quantity.attribute';

@quantityAttribute('h', 'min')
export class Time extends Quantity {
  public static readonly Microsecond: LinearUnit = new LinearUnit('Microsecond', 'Microseconds', 'μs', 0.000001);
  public static readonly Millisecond: LinearUnit = new LinearUnit('Millisecond', 'Milliseconds', 'ms', 0.001);
  public static readonly Second: LinearUnit = new LinearUnit('Second', 'Seconds', 's', 1);
  public static readonly Minute: LinearUnit = new LinearUnit('Minute', 'Minutes', 'min', 60);
  public static readonly Hour: LinearUnit = new LinearUnit('Hour', 'Hours', 'h', 3600);
  public static readonly Day: LinearUnit = new LinearUnit('Day', 'Days', 'd', 86400);
  public static readonly Week: LinearUnit = new LinearUnit('Week', 'Weeks', 'wk', 604800);
  public static readonly Year: LinearUnit = new LinearUnit('Year', 'Years', 'yr', 31557600);

  public readonly name: string = 'Time';

  public readonly units: Unit[] = [
    Time.Microsecond,
    Time.Millisecond,
    Time.Second,
    Time.Minute,
    Time.Hour,
    Time.Day,
    Time.Week,
    Time.Year
  ];
}
