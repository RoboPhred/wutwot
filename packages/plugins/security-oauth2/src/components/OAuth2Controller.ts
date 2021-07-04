import { URL } from "url";
import { inject, injectable, provides, singleton } from "microinject";
import { HttpController, HttpRootUrl } from "@wutwot/plugin-servient-http";
import {
  controller,
  get,
  use,
  expressRequest,
  expressResponse,
  result,
  post,
  queryParam,
} from "simply-express-controllers";
import bodyParser from "body-parser";
import cors from "cors";
import nocache from "nocache";
import OAuth2Server, { AuthorizationCode, Token } from "oauth2-server";
import { Request, Response } from "express";
import createError from "http-errors";
import HttpStatusCodes from "http-status-codes";
import cookieParser from "cookie-parser";
import { v4 as uuidv4 } from "uuid";
import { OAuth2ClientProvider } from "./OAuth2ClientProvider";
import { OAuth2CredentialManager } from "./OAuth2CredentialManager";
import { ActorResolver } from "../../../../core/lib";

// TODO: Split out the multiple concerns in this class

@injectable()
@singleton()
@provides(HttpController)
@controller("/oauth2")
@use(
  cookieParser(),
  bodyParser.urlencoded({ extended: false }),
  cors({ origin: "*" }),
  nocache(),
)
export class OAuth2Controller {
  private _oauth: OAuth2Server;

  private _authorizationsByCode = new Map<string, AuthorizationCode>();

  constructor(
    @inject(HttpRootUrl) private readonly _rootUrl: string,
    @inject(ActorResolver) private readonly _actorResolver: ActorResolver,
    @inject(OAuth2ClientProvider)
    private readonly _clientProvider: OAuth2ClientProvider,
    @inject(OAuth2CredentialManager)
    private readonly _credentialManager: OAuth2CredentialManager,
  ) {
    this._oauth = new OAuth2Server({
      allowEmptyState: true,
      authenticateHandler: {
        handle: async (req: Request, res: Response) => {
          const auth =
            req.cookies["Authorization"] ?? req.headers["Authorization"] ?? "";
          if (!auth.starsWith("Bearer ")) {
            throw createError(HttpStatusCodes.UNAUTHORIZED);
          }

          const token = auth.substring(7);

          const actor = await this._actorResolver.getActorFromCredentials({
            type: "token",
            token,
          });
          if (!actor) {
            throw createError(HttpStatusCodes.UNAUTHORIZED);
          }
          return { id: actor.id };
        },
      },
      model: {
        // getUser: async (username, password) => {
        //   if (username === "test" && password === "test") {
        //     return { id: "test" };
        //   }
        //   return false;
        // },
        saveAuthorizationCode: async (code, client, user) => {
          const authCode = {
            ...code,
            client,
            user,
          };

          this._authorizationsByCode.set(code.authorizationCode, authCode);

          return authCode;
        },
        getAuthorizationCode: async (authorizationCode: string) => {
          const auth = this._authorizationsByCode.get(authorizationCode);
          if (!auth) {
            return false;
          }

          if (auth.expires < Date.now()) {
            this._authorizationsByCode.delete(authorizationCode);
            return false;
          }

          const client = this._clientProvider.getClient(auth.client.id);
          if (!client) {
            this._authorizationsByCode.delete(authorizationCode);
            return false;
          }

          return auth;
        },
        revokeAuthorizationCode: async (code: AuthorizationCode) => {
          return this._authorizationsByCode.delete(code.authorizationCode);
        },
        getClient: async (clientId: string) => {
          return this._clientProvider.getClient(clientId) ?? false;
        },
        getAccessToken: async (accessToken) => {
          return this._credentialManager.getAccessToken(accessToken);
        },
        getRefreshToken: async (refreshToken) => {
          return this._credentialManager.getRefreshToken(refreshToken);
        },
        saveToken: async (partialToken, client, user) => {
          const token: Token = {
            ...partialToken,
            client,
            user,
          };

          this._credentialManager.saveAccessToken(token);

          return token;
        },
        validateScope: async (user, client, scope) => {
          return scope;
        },
        verifyScope: async (token, scope) => {
          return token.scope === scope;
        },
      },
    });
  }

  @get("/authorize")
  async authorize(
    @queryParam("client_id", { required: true }) clientId: string,
    @queryParam("redirect_uri", { required: true }) redirectUri: string,
    @queryParam("response_type", { required: true, schema: { const: "code" } })
    responseType: string,
    @queryParam("scope", { required: true }) scope: string,
    @queryParam("state") state: string,
  ) {
    const authorizeLink = new URL(this._rootUrl);
    authorizeLink.pathname = "/oauth2/grant_access";
    authorizeLink.searchParams.set("client_id", clientId);
    authorizeLink.searchParams.set("redirect_uri", redirectUri);
    authorizeLink.searchParams.set("response_type", responseType);
    authorizeLink.searchParams.set("scope", scope);
    if (state) {
      authorizeLink.searchParams.set("state", state);
    }

    const csrf = uuidv4();
    authorizeLink.searchParams.set("csrf", csrf);

    return result
      .html(
        `
          <html>
            <head>
            </head>
            <body>
              <a href="${authorizeLink.toString()}">Authorize</a>
            </body>
          </html>
        `,
      )
      .cookie("csrf", csrf, { secure: true, sameSite: "strict" });
  }

  @get("/grant_access")
  async grantAccess(
    @queryParam("csrf") csrf: string,
    @expressRequest() req: Request,
    @expressResponse() res: Response,
  ) {
    // TODO: Cookie decorator for simply-express-controllers
    if (csrf !== req.cookies.csrf) {
      throw createError(HttpStatusCodes.UNAUTHORIZED, "Invalid CSRF token.");
    }

    try {
      const authResult = await this._oauth.authorize(
        new OAuth2Server.Request(req),
        new OAuth2Server.Response(res),
      );
      const url = new URL(authResult.redirectUri);
      url.searchParams.set("code", authResult.authorizationCode);
      res.redirect(url.toString());
      return result.handled();
    } catch (e) {
      console.error(e);
      if (e.statusCode) {
        throw createError(e.statusCode, e.message);
      }
    }
  }

  @post("/token")
  async accessToken(
    @expressRequest() req: Request,
    @expressResponse() res: Response,
  ) {
    try {
      const token = await this._oauth.token(
        new OAuth2Server.Request(req),
        new OAuth2Server.Response(res),
      );
      return result({
        access_token: token.accessToken,
        expires_in: token.expiresIn,
      });
    } catch (e) {
      if (e.statusCode) {
        throw createError(e.statusCode, e.message);
      }
    }
  }
}
