export class Trace2D {
  public hasLowerBound: boolean = false;
  public lowerBound: number = -100;
  public hasUpperBound: boolean = false;
  public upperBound: number = 100;
  public display: boolean = true;
  public trace: (number) => number;
  public expression: string;
  public color: string = 'blue';
  public lineThickness: number = 2;

  public toString(): string {
    return this.expression;
  }

  public clone(): Trace2D {
    const o = new Trace2D();
    o.lowerBound = this.lowerBound;
    o.hasLowerBound = this.hasLowerBound;
    o.upperBound = this.upperBound;
    o.hasUpperBound = this.hasUpperBound;
    o.display = this.display;
    o.trace = this.trace;
    o.expression = this.expression;
    o.color = this.color;
    o.lineThickness = this.lineThickness;

    return o;
  }
}
