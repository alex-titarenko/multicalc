import { Quantity } from './quantity';
import { Unit } from './../units/unit';
import { LinearUnit } from './../units/linear-unit';
import { quantityAttribute } from './annotation/quantity.attribute';

@quantityAttribute('mph', 'km/h')
export class Speed extends Quantity {
  public static readonly CentimeterPerSecond: LinearUnit  = new LinearUnit('Centimeter per second', 'Centimeters per second', 'cm/s', 0.01);
  public static readonly MeterPerSecond: LinearUnit = new LinearUnit('Meter per second', 'Meters per second', 'm/s', 1);
  public static readonly KilometerPerHour: LinearUnit = new LinearUnit('Kilometer per hour', 'Kilometers per hour', 'km/h', 1 / 3.6);
  public static readonly FeetPerSecond: LinearUnit = new LinearUnit('Feet per second', 'Feet per second', 'fps', 0.3048);
  public static readonly MilesPerHour: LinearUnit = new LinearUnit('Mile per hour', 'Miles per hour', 'mph', 0.44704);
  public static readonly Knot: LinearUnit = new LinearUnit('Knot', 'Knots', 'kn', 1852 / 3600);
  public static readonly Mach: LinearUnit = new LinearUnit('Mach', 'Mach', 'M', 340.2933);

  public readonly name: string = 'Speed';

  public readonly units: Unit[] = [
    Speed.CentimeterPerSecond,
    Speed.MeterPerSecond,
    Speed.KilometerPerHour,
    Speed.FeetPerSecond,
    Speed.MilesPerHour,
    Speed.Knot,
    Speed.Mach
  ];
}
