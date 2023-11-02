export class Enumerator<T> {
  protected index: number;

  constructor(protected collection: T[]) {
    this.reset();
  }

  public get current(): T {
    if (this.index === -1) {
      throw new Error('Enumeration has not started. Call moveNext.');
    }

    if (this.index >= this.collection.length) {
      throw new Error('Enumeration already finished.');
    }

    return this.collection[this.index];
  }

  public reset(): void {
    this.index = -1;
  }

  public moveNext(): boolean {
    this.index++;
    return this.index < this.collection.length;
  }
}
