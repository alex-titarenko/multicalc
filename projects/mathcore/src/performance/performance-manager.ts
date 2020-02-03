import { InvalidOperationError } from 'mathcore/errors/invalid-operation-error';

export class PerformanceManager {
  public static current: PerformanceManager = new PerformanceManager();

  public maxArraySize: number;
  public maxIterationCount: number;

  protected constructor() {
    this.maxArraySize = -1;
    this.maxIterationCount = -1;
  }

  public ensureAcceptableArraySize(size: number): void {
    if (this.maxArraySize > 0 && size >= this.maxArraySize) {
      throw new InvalidOperationError('The array size is too large.');
    }
  }

  public ensureAcceptableIterationCount(count: number): void {
    if (this.maxIterationCount > 0 && count >= this.maxIterationCount) {
      throw new InvalidOperationError('The number of iteration is too much.');
    }
  }
}
