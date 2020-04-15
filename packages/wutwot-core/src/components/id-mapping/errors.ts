export class DuplicateIDError extends Error {
  code: string;
  constructor(message: string) {
    super(message);
    this.message = message;
    this.code = "ERR_DUPLICATE_ID";
    Object.setPrototypeOf(this, Error.prototype);
  }
}

export class InvalidIDError extends Error {
  code: string;
  constructor(message: string) {
    super(message);
    this.message = message;
    this.code = "ERR_INVALID_ID";
    Object.setPrototypeOf(this, Error.prototype);
  }
}
