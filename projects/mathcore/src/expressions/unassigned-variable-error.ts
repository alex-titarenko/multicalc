export class UnassignedVariableError extends Error {
  constructor(
    public readonly variableName: string,
    message: string = `Variable '${variableName}' is unassigned.`) {
    super(message);

    // Set the prototype explicitly.
    Object.setPrototypeOf(this, UnassignedVariableError.prototype);
  }
}
