export class SchemaValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.message = message;
    Object.setPrototypeOf(this, Error.prototype);
  }
}
