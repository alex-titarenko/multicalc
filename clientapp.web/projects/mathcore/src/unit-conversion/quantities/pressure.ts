// tslint:disable:max-line-length

import { Quantity } from './quantity';
import { Unit } from './../units/unit';
import { LinearUnit } from './../units/linear-unit';
import { quantityAttribute } from './annotation/quantity.attribute';

@quantityAttribute('mmHg', 'Pa')
export class Pressure extends Quantity {
  public static readonly Pascal: LinearUnit = new LinearUnit('Pascal', 'Pascal', 'Pa', 1);
  public static readonly KiloPascal: LinearUnit = new LinearUnit('Kilo Pascal', 'Kilo Pascal', 'kPa', 1000);
  public static readonly Bar: LinearUnit = new LinearUnit('Bar', 'Bar', 'bar', 100000);
  public static readonly MillimeterOfMercury: LinearUnit = new LinearUnit('Millimeter of mercury', 'Millimeters of mercury', 'mmHg', 133.3224);
  public static readonly PaundPerSquareInch: LinearUnit = new LinearUnit('Paund per square inch', 'Paunds per square inch', 'psi', 6894.757);
  public static readonly Atmosphere: LinearUnit = new LinearUnit('Atmosphere', 'Atmospheres', 'atm', 101325);

  public readonly name: string = 'Pressure';

  public readonly units: Unit[] = [
    Pressure.Pascal,
    Pressure.KiloPascal,
    Pressure.Bar,
    Pressure.MillimeterOfMercury,
    Pressure.PaundPerSquareInch,
    Pressure.Atmosphere
  ];
}
