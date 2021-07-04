# @wutwot/binding-http

Provides HTTP bindings for things.

Additionally, provides a `/things` and `/things/:thingId` endpoint for fetching thing descriptions.

This plugin requires an http servient. Nominally, `@wutwot/plugin-servient-http` can be used, or any other plugin providing compatible services.

## Plugin services

### Required services

- `Symbol.for("https://github.com/robophred/wutwot#servient-http:HttpRootUrl")` - This services needs to know the root url of the http servient to provide the thing description forms.

### Optional Services

- `Symbol.for("https://github.com/robophred/wutwot#core:ActorCredentialsHandler")` - If present, this service will gate its endpoint behind token based authentication provided by any plugin providing this service.

### Provided services

- `Symbol.for("https://github.com/robophred/wutwot#core:FormProvider")` - Provides http binding forms for every interaction on all thing descriptions.
- `Symbol.for("https://github.com/robophred/wutwot#servient-http:HttpController")` - Provides http bindings for interaction affordances, in addition to endpoints for fetching thing descriptions.
