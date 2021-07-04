# @wutwot/plugin-binding-http

Provides HTTP bindings for things.

Additionally, provides a `/things` and `/things/:thingId` endpoint for fetching thing descriptions.

## Requirements

- This plugin requires an http servient. Nominally, `@wutwot/plugin-servient-http` can be used, or any other plugin providing compatible services.

- This plugin requires a credential handler service, otherwise the endpoints will always return `401 Unauthorized`. Some options are:
  - `@wutwot/plugins-security-oauth2` - Note: This plugin requires an additional credential handler to complete the oauth2 code flow.

## Security

The http endpoints provided by this plugin will check for a Authorization header or cookie, try to resolve either the `token` or `anonymous` credentials it receives against any `ActorCredentialsHandler` service available.
By default, WutWot Core will reject all credentials unless at least one other plugin provides a `ActorCredentialsHandler` service. You must supply a plugin providing this service.

## Plugin services

### Required services

- `Symbol.for("https://github.com/robophred/wutwot#servient-http:HttpRootUrl")` - This plugin needs to know the root url of the http servient to provide the thing description forms.
- `Symbol.for("https://github.com/robophred/wutwot#core:ActorCredentialsHandler")` - This plugin authenticates endpoint requests with either a `token` or `anonymous` credentials, depending on the connection.

### Provided services

- `Symbol.for("https://github.com/robophred/wutwot#core:FormProvider")` - Provides http binding forms for every interaction on all thing descriptions.
- `Symbol.for("https://github.com/robophred/wutwot#servient-http:HttpController")` - Provides http bindings for interaction affordances, in addition to endpoints for fetching thing descriptions.
