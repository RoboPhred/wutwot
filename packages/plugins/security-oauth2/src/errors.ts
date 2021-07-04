export class Oauth2ClientNotFoundError extends Error {
  message: string;
  code = "OAUTH2_CLIENT_NOT_FOUND";
  constructor(message: string = "Oauth2 client not found.") {
    super(message);
    this.message = message;
    Object.setPrototypeOf(this, Oauth2ClientNotFoundError.prototype);
  }
}
