import { Unit } from '../units/unit';

export abstract class Quantity {
  public abstract readonly name: string;
  public abstract readonly units: Unit[];
}
