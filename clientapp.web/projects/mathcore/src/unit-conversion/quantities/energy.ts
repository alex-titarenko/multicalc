import { Quantity } from './quantity';
import { Unit } from './../units/unit';
import { LinearUnit } from './../units/linear-unit';
import { quantityAttribute } from './annotation/quantity.attribute';

@quantityAttribute('J', 'cal')
export class Energy extends Quantity {
  public static readonly ElectronVolt: LinearUnit = new LinearUnit('Electron volt', 'Electron volts', 'eV', 1.60217653e-19);
  public static readonly Joule: LinearUnit = new LinearUnit('Joule', 'Joules', 'J', 1);
  public static readonly Kilojoule: LinearUnit = new LinearUnit('Kilojoule', 'Kilojoules', 'kJ', 1000);
  public static readonly Calorie: LinearUnit = new LinearUnit('Calorie', 'Calories', 'cal', 4.1868);
  public static readonly Kilocalorie: LinearUnit = new LinearUnit('Kilocalorie', 'Kilocalories', 'kcal', 4186.8);
  public static readonly FoodPound: LinearUnit = new LinearUnit('Food-pound', 'Food-pounds', 'ft lbf', 1.3558179483314004);
  public static readonly BritishThermalUnit: LinearUnit = new LinearUnit('British thermal unit', 'British thermal units', 'BTU', 1055.056);

  public readonly name: string = 'Energy';

  public readonly units: Unit[] = [
    Energy.ElectronVolt,
    Energy.Joule,
    Energy.Kilojoule,
    Energy.Calorie,
    Energy.Kilocalorie,
    Energy.FoodPound,
    Energy.BritishThermalUnit
  ];
}
