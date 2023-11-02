import { Decimal } from '../decimal';
import { Unit } from './units/unit';
import * as q from './quantities';

export class UnitConverter {
  public static readonly Length: q.Length = new q.Length();
  public static readonly Weight: q.Weight = new q.Weight();
  public static readonly Volume: q.Volume = new q.Volume();
  public static readonly Area: q.Area = new q.Area();
  public static readonly Speed: q.Speed = new q.Speed();
  public static readonly Time: q.Time = new q.Time();
  public static readonly Temperature: q.Temperature = new q.Temperature();
  public static readonly Energy: q.Energy = new q.Energy();
  public static readonly Power: q.Power = new q.Power();
  public static readonly Pressure: q.Pressure = new q.Pressure();
  public static readonly Angle: q.Angle = new q.Angle();
  public static readonly Data: q.Data = new q.Data();

  public static readonly quantities: q.Quantity[] = [
    UnitConverter.Length,
    UnitConverter.Weight,
    UnitConverter.Volume,
    UnitConverter.Area,
    UnitConverter.Speed,
    UnitConverter.Time,
    UnitConverter.Temperature,
    UnitConverter.Energy,
    UnitConverter.Power,
    UnitConverter.Pressure,
    UnitConverter.Angle,
    UnitConverter.Data
  ];

  public static convert(sourceValue: Decimal, sourceUnit: Unit, outputUnit: Unit): Decimal {
    return sourceUnit.convert(sourceValue, outputUnit);
  }
}
