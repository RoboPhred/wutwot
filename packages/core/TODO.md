# TODO

## Support per-affordance forms

We support bulk forms, but should also support per-affordance if any plugin has its own side channel.

## Allow additional JSON-LD properties.

Need to support

- semanticType should be json-ld IRI types.
- Additional JSON-LD extensions on everything.

We emit absolute IRIs for toJSONLD, which makes this a lot easier. We do not have to care
about populating the context, all we need to do is collect the context url and allow arbitrary IRI / value pairs.

`event.addExtensionProperty("http://my-context.com/c/terms/foobar", 42);`

Function would return an object that can be used to revoke or change the property value.

Multiple registrations of the same IRI turn it into an array, as is usual for json-ld.

Compaction step might need to determine a prefix to use for the property, or can we leave it as IRIs?

### Should the binding plugin be responsible for td-ification?

Right now, @wutwot/plugin-binding-express takes the expanded form JSON-LD and compacts it, making it compatible with
the td spec. This seems the right thing to do, but it does mean that we need to figure out how to deal with converting
the custom IRIs to prefixed properties. Some prefixes td itself defines (like htv). Some IRIs have a commonly used prefix, like sarat.

## Extendable behavior for Things / Properties / Actions / Events

"Allow additional JSON-LD properties" implies we want to stick arbitrary properties to objects, at least for json-ld.

This could be further extended by making the properties also available on the normal api service as extended properties.

API for this: extendo objects (extendo api? composite objects?)

An object that can be extended with other classes, similar to mixins but the plugins are kept apart. Also similar to treating the object
as a dependency container, where the dependencies can expose properties on the main api surface of the object. API ensures
properties are unique.

Core will provide a few default extensions: Thing core (title, description), actions provider, properties provider, events provider.
json-ld extension scans all other extensions for those that provide json-ld attributes and @types. One extension should provide an @id, with safty check to ensure no conflicting id.
For all other conflicting json-ld attributes, bundle them up and make the attribute value an array (assume its a one-to-many attribute).

Extendo object will then create a proxy that builds the public api, exposing the extension props.

wutwot should support adding extensions to individual objects, and extension provides that automatically add extensions to all objects of a type (thing, action, exc).

## Make public api proxies for properties and events

Things and actions use api proxies to prevent plugins messing with their internals. Other interactions should too.

## Utility classes for plugins

- Class that adds a pragmatic thing, using decorators to describe properties on getters/setters, actions, and so on.
- Class that calls a func for every thing (or even action / property / event). On init, walk through all things, then await new things and call for them. ThingWatcher class.

## IRI IDs.

Currently, ids in wutwot are arbitrary strings. We pass that as the @id in jsonld, but IDs
should be IRIs. We should generate IRIs in wutwot for ids.

Consider adding an option to wutwot core to choose how to generate ids, or at the very least
clean up and document our urn. Should move all id generation into functions of a single file to
centralize them at the very least.

## Metadata on properties, actions, events

## NodeJS events for individual topics

- Thing events
  - Property added / removed
  - Action added / removed
  - Event added / removed
  - Mirror events from individual actions / requests / properties / events?
    - Property updated
    - Action requested / started / cancelled / completed
    - Event raised
      Action events
- Action requested
  - Mirror events from action requests?
    Action request events
  - started / cancelled / completed
- Property events
  - value updated
- Event events
  - event raised (new record)

## Actor support on invoking actions and setting properties

Contract should be called both before and after the action / set, allowing for both access denial and audit logging.

## API documentation

https://www.npmjs.com/package/@microsoft/api-extractor
