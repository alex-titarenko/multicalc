import { ComplexIntegrator } from './complex-Integrator';
import { ArgumentError } from 'mathcore/errors/argument-error';

/**
 * Represents the abstract base class for classes implementing algorithms of numerical composite integration.
 */
export abstract class ComplexCompositeIntegrator extends ComplexIntegrator {
    private _tolerance: number;
    private _maxIterations: number;
    private _iterationsNeeded: number;

    /**
     * Gets the tolerance used in the convergence test.
     */
    public get tolerance(): number {
      return this._tolerance;
    }

    /**
     * Sets the tolerance used in the convergence test.
     * @throws {InvalidOperationException} - Tolerance must be non negative.
     */
    public set tolerance(value: number) {
      if (value < 0.0) {
        throw new ArgumentError('The value of tolerance must be non negative.');
      }

      this._tolerance = value;
    }

    /**
     * Gets the maximum number of iterations.
     */
    public get maxIterations(): number {
      return this._maxIterations;
    }

    /**
     * Sets the maximum number of iterations.
     * @throws {InvalidOperationException} - MaxIterations must be greater than zero.
     */
    public set maxIterations(value: number) {
      if (value < 1) {
        throw new ArgumentError('The maximum number of iterations must be greater than zero.');
      }

      this._maxIterations = value;
    }

    /**
     * Gets the number of iterations needed for the algorithm to achieve the desired accuracy.
     */
    public get iterationsNeeded(): number {
      return this._iterationsNeeded;
    }

    /**
     * Sets the number of iterations needed for the algorithm to achieve the desired accuracy.
     */
    public set iterationsNeeded(value: number) {
      this._iterationsNeeded = value;
    }
}
