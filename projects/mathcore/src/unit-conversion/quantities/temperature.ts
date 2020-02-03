// tslint:disable:max-line-length

import { Quantity } from './quantity';
import { Unit } from './../units/unit';
import { CustomUnit } from './../units/custom-unit';
import { quantityAttribute } from './annotation/quantity.attribute';

@quantityAttribute('F', 'C')
export class Temperature extends Quantity {
  public static readonly Celsius: CustomUnit = new CustomUnit('Celsius', 'Celsius', 'C', C => C, C => C);
  public static readonly Fahrenheit: CustomUnit = new CustomUnit('Fahrenheit', 'Fahrenheit', 'F', C => C.mul(9).div(5).add(32), F => F.sub(32).mul(5).div(9));
  public static readonly Kelvin: CustomUnit = new CustomUnit('Kelvin', 'Kelvin', 'K', C => C.add(273.15), K => K.sub(273.15));
  public static readonly Rankine: CustomUnit = new CustomUnit('Rankine', 'Rankine', 'R', C => C.add(273.15).mul(9).div(5), R => R.sub(491.67).mul(5).div(9));
  public static readonly Delisle: CustomUnit = new CustomUnit('Delisle', 'Delisle', 'De', C => C.neg().add(100).mul(1.5), De => De.neg().mul(2).div(3).add(100));
  public static readonly Newton: CustomUnit = new CustomUnit('Newton', 'Newton', 'N', C => C.mul(33).div(100), N => N.mul(100).div(33));

  public readonly name: string = 'Temperature';

  public readonly units: Unit[] = [
    Temperature.Celsius,
    Temperature.Fahrenheit,
    Temperature.Kelvin,
    Temperature.Rankine,
    Temperature.Delisle,
    Temperature.Newton
  ];
}
