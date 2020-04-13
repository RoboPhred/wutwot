export class SchemaValidationError extends Error {
  code: string;
  constructor(message: string) {
    super(message);
    this.message = message;
    this.code = "ERR_SCHEMA_VIOLATION";
    Object.setPrototypeOf(this, Error.prototype);
  }
}
