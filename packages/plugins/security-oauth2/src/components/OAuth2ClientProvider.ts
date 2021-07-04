import { injectable, singleton } from "microinject";
import { Client } from "oauth2-server";

import { Oauth2ClientNotFoundError } from "../errors";

// TODO: Make configurable from plugin opts
// TODO: Accept client providers from other plugins.
@injectable()
@singleton()
export class OAuth2ClientProvider {
  getClient(clientId: string): Client {
    switch (clientId) {
      // case "internal":
      //   return {
      //     id: "internal",
      //     grants: ["password"],
      //   };
      case "oauthdebugger":
        return {
          id: "oauthdebugger",
          redirectUris: ["https://oauthdebugger.com/debug"],
          grants: ["authorization_code", "refresh_token"],
        };
    }

    throw new Oauth2ClientNotFoundError();
  }
}
