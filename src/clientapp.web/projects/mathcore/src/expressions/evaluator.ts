/** Defines a method for evaluating. */
export interface Evaluator<T> {
  /** Returns the result of evaluation. */
  evaluate(): T;
}
