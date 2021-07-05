import { inject, injectable, provides, singleton } from "microinject";

import { Thing } from "../../things";

import { ActorCredentialsHandler } from "../contracts";
import { ActorNotFoundError } from "../errors";
import { ActorResolver } from "../services";
import { ActorCredentials } from "../types";

@injectable()
@singleton()
@provides(ActorResolver)
export class ActorResolverImpl implements ActorResolver {
  constructor(
    @inject(ActorCredentialsHandler, { all: true, optional: true })
    private readonly _credentialHandlers: ActorCredentialsHandler[],
  ) {}

  getActorFromCredentials(credentials: ActorCredentials): Promise<Thing> {
    const handler = this._credentialHandlers.find((handler) =>
      handler.isSupportedCredentials(credentials),
    );
    if (!handler) {
      throw new ActorNotFoundError(
        "No handler is present for the given credentials.",
      );
    }

    return handler.getActorFromCredentials(credentials);
  }
}
