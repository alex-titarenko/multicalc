// tslint:disable:max-line-length

import { Quantity } from './quantity';
import { Unit } from './../units/unit';
import { LinearUnit } from './../units/linear-unit';
import { quantityAttribute } from './annotation/quantity.attribute';

@quantityAttribute('kW', 'hp')
export class Power extends Quantity {
  public static readonly Watt: LinearUnit = new LinearUnit('Watt', 'Watts', 'W', 1);
  public static readonly Kilowatt: LinearUnit = new LinearUnit('Kilowatt', 'Kilowatts', 'kW', 1000);
  public static readonly Horsepower: LinearUnit = new LinearUnit('Horsepower', 'Horsepower', 'hp', 745.69987158227022);
  public static readonly FootPound: LinearUnit = new LinearUnit('Foot-pound/minute', 'Foot-pounds/minute', 'ft lbf/min', 0.02259696580552334);
  public static readonly BTU: LinearUnit = new LinearUnit('BTU/minute', 'BTUs/minute', 'BTU/min', 17.584264);
  public static readonly Calorie: LinearUnit = new LinearUnit('Calorie/second', 'Calorie/second', 'cal/s', 4.1868);

  public readonly name: string = 'Power';

  public readonly units: Unit[] = [
    Power.Watt,
    Power.Kilowatt,
    Power.Horsepower,
    Power.FootPound,
    Power.BTU,
    Power.Calorie
  ];
}
