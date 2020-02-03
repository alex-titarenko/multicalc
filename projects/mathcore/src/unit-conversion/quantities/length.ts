import { Quantity } from './quantity';
import { Unit } from './../units/unit';
import { LinearUnit } from './../units/linear-unit';
import { quantityAttribute } from './annotation/quantity.attribute';

@quantityAttribute('in', 'cm')
export class Length extends Quantity {
  public static readonly Nanometer: LinearUnit = new LinearUnit('Nanometer', 'Nanometers', 'nm', 0.000000001);
  public static readonly Micron: LinearUnit = new LinearUnit('Micron', 'Microns', 'µm', 0.000001);
  public static readonly Millimeter: LinearUnit = new LinearUnit('Millimeter', 'Millimeters', 'mm', 0.001);
  public static readonly Centimeter: LinearUnit = new LinearUnit('Centimeter', 'Centimeters', 'cm', 0.01);
  public static readonly Decimeter: LinearUnit = new LinearUnit('Decimeter', 'Decimeters', 'dm', 0.1);
  public static readonly Meter: LinearUnit = new LinearUnit('Meter', 'Meters', 'm', 1);
  public static readonly Kilometer: LinearUnit = new LinearUnit('Kilometer', 'Kilometers', 'km', 1000);
  public static readonly Inch: LinearUnit = new LinearUnit('Inch', 'Inches', 'in', 0.0254);
  public static readonly Feet: LinearUnit = new LinearUnit('Feet', 'Feet', 'ft', 0.3048);
  public static readonly Yard: LinearUnit = new LinearUnit('Yard', 'Yards', 'yd', 0.9144);
  public static readonly Mile: LinearUnit = new LinearUnit('Mile', 'Miles', 'mi', 1609.344);
  public static readonly NauticalMile: LinearUnit = new LinearUnit('Nautical Mile', 'Nautical Miles', 'nmi', 1852);

  public readonly name: string = 'Length';

  public readonly units: Unit[] = [
    Length.Nanometer,
    Length.Micron,
    Length.Millimeter,
    Length.Centimeter,
    Length.Decimeter,
    Length.Meter,
    Length.Kilometer,
    Length.Inch,
    Length.Feet,
    Length.Yard,
    Length.Mile,
    Length.NauticalMile
  ];
}
