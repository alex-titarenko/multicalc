export class ArgumentError extends Error {
  constructor(message: string) {
    super(message);

    // Set the prototype explicitly.
    Object.setPrototypeOf(this, ArgumentError.prototype);
  }
}
