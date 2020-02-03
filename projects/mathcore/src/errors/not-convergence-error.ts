export class NotConvergenceError extends Error {
  constructor(message: string = 'Calculation does not converge to a solution.') {
    super(message);

    // Set the prototype explicitly.
    Object.setPrototypeOf(this, NotConvergenceError.prototype);
  }
}
