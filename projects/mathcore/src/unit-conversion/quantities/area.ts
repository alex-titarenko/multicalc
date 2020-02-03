import { Quantity } from './quantity';
import { Unit } from './../units/unit';
import { LinearUnit } from './../units/linear-unit';
import { quantityAttribute } from './annotation/quantity.attribute';

@quantityAttribute('sq ft', 'sq m')
export class Area extends Quantity {
  public static readonly SquareMillimeter: LinearUnit = new LinearUnit('Square millimeter', 'Square millimeters', 'sq mm', 0.000001);
  public static readonly SquareCentimeter: LinearUnit = new LinearUnit('Square centimeter', 'Square centimeters', 'sq cm', 0.0001);
  public static readonly SquareMeter: LinearUnit = new LinearUnit('Square meter', 'Square meters', 'sq m', 1);
  public static readonly Hectare: LinearUnit = new LinearUnit('Hectare', 'Hectares', 'ha', 10000);
  public static readonly SquareKilometer: LinearUnit = new LinearUnit('Square kilometer', 'Square kilometers', 'sq km', 1000000);
  public static readonly SquareInch: LinearUnit = new LinearUnit('Square inch', 'Square inches', 'sq in', 0.00064516);
  public static readonly SquareFeet: LinearUnit = new LinearUnit('Square feet', 'Square feet', 'sq ft', 0.09290304);
  public static readonly SquareYard: LinearUnit = new LinearUnit('Square yard', 'Square yards', 'sq yd', 0.83612736);
  public static readonly Acre: LinearUnit = new LinearUnit('Acre', 'Acres', 'ac', 4046.8564224);
  public static readonly SquareMile: LinearUnit = new LinearUnit('Square mile', 'Square miles', 'sq mi', 2589988.110336);

  public readonly name: string = 'Area';

  public readonly units: Unit[] = [
    Area.SquareMillimeter,
    Area.SquareCentimeter,
    Area.SquareMeter,
    Area.Hectare,
    Area.SquareKilometer,
    Area.SquareInch,
    Area.SquareFeet,
    Area.SquareYard,
    Area.Acre,
    Area.SquareMile
  ];
}
