import { Quantity } from './quantity';
import { Unit } from '../units/unit';
import { LinearUnit } from './../units/linear-unit';
import { quantityAttribute } from './annotation/quantity.attribute';

@quantityAttribute('rad', '°')
export class Angle extends Quantity {
  public static readonly Degree: LinearUnit = new LinearUnit('Degree', 'Degrees', '°', Math.PI / 180);
  public static readonly Gradian: LinearUnit = new LinearUnit('Gradian', 'Gradians', 'gon', Math.PI / 200);
  public static readonly Radian: LinearUnit = new LinearUnit('Radian', 'Radians', 'rad', 1);
  public static readonly AngularMil: LinearUnit = new LinearUnit('Angular mil', 'Angular mil', 'µ', Math.PI * 2 / 6400);
  public static readonly Arcminute: LinearUnit = new LinearUnit('Arcminute', 'Arcminute', '′', Math.PI / 10800);
  public static readonly Arcsecond: LinearUnit = new LinearUnit('Arcsecond', 'Arcsecond', '\'', Math.PI / 64800);

  public readonly name: string = 'Angle';

  public readonly units: Unit[] = [
    Angle.Degree,
    Angle.Gradian,
    Angle.Radian,
    Angle.AngularMil,
    Angle.Arcminute,
    Angle.Arcsecond
  ];
}
