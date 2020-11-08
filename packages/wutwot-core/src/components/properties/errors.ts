export class PropertySetError extends Error {
  code: string;
  constructor(message: string) {
    super(message);
    this.message = message;
    this.code = "ERR_PROPERTY_SET";
    Object.setPrototypeOf(this, PropertySetError.prototype);
  }
}
