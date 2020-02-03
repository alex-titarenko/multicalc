export class InvalidOperationError extends Error {
  constructor(message: string) {
    super(message);

    // Set the prototype explicitly.
    Object.setPrototypeOf(this, InvalidOperationError.prototype);
  }
}
