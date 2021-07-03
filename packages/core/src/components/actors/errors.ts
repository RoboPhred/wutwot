export class ActorNotFoundError extends Error {
  code: string;
  constructor(message: string) {
    super(message);
    this.code = "ACTOR_NOT_FOUND";
    this.message = message;
    Object.setPrototypeOf(this, ActorNotFoundError.prototype);
  }
}
