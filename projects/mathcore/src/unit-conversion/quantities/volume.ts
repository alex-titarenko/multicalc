import { Quantity } from './quantity';
import { Unit } from './../units/unit';
import { LinearUnit } from './../units/linear-unit';
import { quantityAttribute } from './annotation/quantity.attribute';

@quantityAttribute('L', 'ml')
export class Volume extends Quantity {
  public static readonly Milliliter: LinearUnit = new LinearUnit('Milliliter', 'Milliliters', 'ml', 0.000001);
  public static readonly Liter: LinearUnit = new LinearUnit('Liter', 'Liters', 'L', 0.001);
  public static readonly CubicMeter: LinearUnit = new LinearUnit('Cubic meter', 'Cubic meters', 'm3', 1);

  public static readonly CubicInch: LinearUnit = new LinearUnit('Cubic inch', 'Cubic inches', 'cu in', 0.000016387064);
  public static readonly CubicFeet: LinearUnit = new LinearUnit('Cubic feet', 'Cubic feet', 'cu ft', 0.028316846592);
  public static readonly CubicYard: LinearUnit = new LinearUnit('Cubic yard', 'Cubic yards', 'cu yd', 0.764554857984);

  public static readonly FluidOunceUS: LinearUnit = new LinearUnit('Fluid ounce (US)', 'Fluid ounces (US)', 'US fl oz', 0.0000295735295625);
  public static readonly PintUS: LinearUnit = new LinearUnit('Pint (US)', 'Pints (US)', 'pt (US fl)', 0.000473176473);
  public static readonly QuartUS: LinearUnit = new LinearUnit('Quart (US)', 'Quarts (US)', 'qt (US)', 0.000946352946);
  public static readonly GallonUS: LinearUnit = new LinearUnit('Gallon (US)', 'Gallons (US)', 'gal (US)', 0.003785411784);

  public static readonly FluidOunceUK: LinearUnit = new LinearUnit('Fluid ounce (UK)', 'Fluid ounces (UK)', 'UK fl oz', 0.0000284130625);
  public static readonly PintUK: LinearUnit = new LinearUnit('Pint (UK)', 'Pints (UK)', 'pt (UK fl)', 0.00056826125);
  public static readonly QuartUK: LinearUnit = new LinearUnit('Quart (UK)', 'Quarts (UK)', 'qt (UK)', 0.0011365225);
  public static readonly GallonUK: LinearUnit = new LinearUnit('Gallon (UK)', 'Gallons (UK)', 'gal (UK)', 0.00454609);

  public readonly name: string = 'Volume';

  public readonly units: Unit[] = [
    Volume.Milliliter,
    Volume.Liter,
    Volume.CubicMeter,
    Volume.CubicInch,
    Volume.CubicFeet,
    Volume.CubicYard,
    Volume.FluidOunceUS,
    Volume.PintUS,
    Volume.QuartUS,
    Volume.GallonUS,
    Volume.FluidOunceUK,
    Volume.PintUK,
    Volume.QuartUK,
    Volume.GallonUK
  ];
}
