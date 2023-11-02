export class ExampleUsage {
  constructor (
    public readonly expression: string,
    public readonly result: string,
    public readonly canMultipleResults: boolean = false) {}

    public toString() {
      return `${this.expression} = ${this.result}`;
    }
}
