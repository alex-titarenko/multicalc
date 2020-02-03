import { Quantity } from './quantity';
import { Unit } from './../units/unit';
import { LinearUnit } from './../units/linear-unit';
import { quantityAttribute } from './annotation/quantity.attribute';

@quantityAttribute('lb', 'kg')
export class Weight extends Quantity {
  public static readonly Carat: LinearUnit = new LinearUnit('Carat', 'Carats', 'ct', 0.0002);
  public static readonly Milligram: LinearUnit = new LinearUnit('Milligram', 'Milligrams', 'mg', 0.000001);
  public static readonly Centigram: LinearUnit = new LinearUnit('Centigram', 'Centigrams', 'cg', 0.00001);
  public static readonly Decigram: LinearUnit = new LinearUnit('Decigram', 'Decigrams', 'dg', 0.0001);
  public static readonly Gram: LinearUnit = new LinearUnit('Gram', 'Grams', 'g', 0.001);
  public static readonly Dekagram: LinearUnit = new LinearUnit('Dekagram', 'Dekagrams', 'dag', 0.01);
  public static readonly Hectogram: LinearUnit = new LinearUnit('Hectogram', 'Hectograms', 'hg', 0.1);
  public static readonly Kilogram: LinearUnit = new LinearUnit('Kilogram', 'Kilograms', 'kg', 1);
  public static readonly Tonne: LinearUnit = new LinearUnit('Tonne', 'Tonnes', 't', 1000);
  public static readonly Ounce: LinearUnit = new LinearUnit('Ounce', 'Ounces', 'oz', 0.028349523125);
  public static readonly Pound: LinearUnit = new LinearUnit('Pound', 'Pounds', 'lb', 0.45359237);
  public static readonly Stone: LinearUnit = new LinearUnit('Stone', 'Stone', 'st', 6.35029318);
  public static readonly ShortTon: LinearUnit = new LinearUnit('Short ton (US)', 'Short tons (US)', 'sh tn', 907.18474);
  public static readonly LongTon: LinearUnit = new LinearUnit('Long ton', 'Long tons (UK)', 'long tn', 1016.0469088);

  public readonly name: string = 'Weight';

  public readonly units: Unit[] = [
    Weight.Carat,
    Weight.Milligram,
    Weight.Centigram,
    Weight.Decigram,
    Weight.Gram,
    Weight.Dekagram,
    Weight.Hectogram,
    Weight.Kilogram,
    Weight.Tonne,
    Weight.Ounce,
    Weight.Pound,
    Weight.Stone,
    Weight.ShortTon,
    Weight.LongTon
  ];
}
