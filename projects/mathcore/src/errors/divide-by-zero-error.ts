export class DivideByZeroError extends Error {
  constructor(message: string = 'Dividing by zero is not allowed.') {
    super(message);

    // Set the prototype explicitly.
    Object.setPrototypeOf(this, DivideByZeroError.prototype);
  }
}
