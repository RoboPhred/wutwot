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
import OAuth2Server, {
  AuthorizationCode,
  Client,
  Token,
  RefreshToken,
} from "oauth2-server";
import { query, Request, Response } from "express";
import createError from "http-errors";
import HttpStatusCodes from "http-status-codes";
import cookieParser from "cookie-parser";
import { v4 as uuidv4 } from "uuid";
import {
  Actor,
  ActorCredentials,
  ActorCredentialsHandler,
  ActorNotFoundError,
  isTokenActorCredentials,
  PluginThingsManager,
} from "../../../../core/lib";

// TODO: Split out the multiple concerns in this class

@injectable()
@singleton()
@provides(HttpController)
@provides(ActorCredentialsHandler)
@controller("/oauth2")
@use(
  cookieParser(),
  bodyParser.urlencoded({ extended: false }),
  cors({ origin: "*" }),
  nocache(),
)
export class OAuth2Controller implements ActorCredentialsHandler {
  private _oauth: OAuth2Server;

  private _clients = new Map<string, Client>();

  // TODO: Handle expirations for these.
  private _authorizationsByCode = new Map<string, AuthorizationCode>();
  private _tokens = new Map<string, Token>();
  private _refreshTokens = new Map<string, RefreshToken>();

  constructor(
    @inject(HttpRootUrl) private readonly _rootUrl: string,
    @inject(PluginThingsManager)
    private readonly _thingsManager: PluginThingsManager,
  ) {
    this._clients.set("internal", {
      id: "internal",
      grants: ["password"],
    });
    this._clients.set("external", {
      id: "external",
      redirectUris: ["https://oauthdebugger.com/debug"],
      grants: ["authorization_code", "refresh_token"],
    });

    this._oauth = new OAuth2Server({
      allowEmptyState: true,
      model: {
        getUser: async (username, password) => {
          if (username === "test" && password === "test") {
            return { id: "test" };
          }
          return false;
        },
        saveAuthorizationCode: async (code, client, user) => {
          const authCode = {
            ...code,
            client,
            user,
          };

          this._authorizationsByCode.set(code.authorizationCode, authCode);

          return authCode;
        },
        getAuthorizationCode: async (code: string) => {
          const auth = this._authorizationsByCode.get(code);
          if (!auth) {
            return false;
          }

          if (auth.expires < Date.now()) {
            this._authorizationsByCode.delete(code);
            return false;
          }

          const client = this._clients.get(auth.client.id);
          if (!client) {
            this._authorizationsByCode.delete(code);
            return false;
          }

          return auth;
        },
        revokeAuthorizationCode: async (code: AuthorizationCode) => {
          return this._authorizationsByCode.delete(code.authorizationCode);
        },
        getClient: async (clientId: string) => {
          return this._clients.get(clientId) ?? false;
        },
        getAccessToken: async (accessToken) => {
          const token = this._tokens.get(accessToken);
          if (!token) {
            return false;
          }

          if (token.expires < Date.now()) {
            this._tokens.delete(accessToken);
            return false;
          }

          return token;
        },
        saveToken: async (partialToken, client, user) => {
          const token: Token = {
            ...partialToken,
            client,
            user,
          };
          this._tokens.set(partialToken.accessToken, token);
          if (token.refreshToken) {
            this._refreshTokens.set(token.refreshToken, {
              refreshToken: token.refreshToken,
              refreshTokenExpiresAt: token.refreshTokenExpiresAt,
              client,
              user,
            });
          }

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

  isSupportedCredentials(credentials: ActorCredentials): boolean {
    if (!isTokenActorCredentials(credentials)) {
      return false;
    }

    // TODO: Decode jwt and see if we are an oauth2 credential.
    return true;
  }

  async getActorFromCredentials(credentials: ActorCredentials): Promise<Actor> {
    if (!isTokenActorCredentials(credentials)) {
      throw new ActorNotFoundError("Credential type not supported.");
    }

    const { token } = credentials;

    if (!this._tokens.has(token)) {
      throw new ActorNotFoundError();
    }

    // TODO: Use persisted things, do not generate them on the fly.
    return this._thingsManager
      .addThing({
        pluginLocalId: `actor-${token}`,
        title: `Actor ${token}`,
        description: "TODO use persisted things for oauth2 actors.",
      })
      .toThing();
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
