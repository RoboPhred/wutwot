export class ActionInvocationError extends Error {
  code: string;
  constructor(message: string) {
    super(message);
    this.message = message;
    this.code = "ERR_ACTION_INVOCATION";
    Object.setPrototypeOf(this, ActionInvocationError.prototype);
  }
}
