# TODO

#### Stronger typeings for ThingProperty.

- [The Standard](https://w3c.github.io/wot-thing-description/) defines NumericThingProperty, ObjectThingProperty, and so on.

#### Relationship between W3C WOT and JSON-LD is unclear.

Is a WOT spec JSON-LD, or does it just borrow the context?

W3C-WOT defines @context to be mandatory at the top level, but proper JSON-LD
can just make every key a full IRI.

I am tempted to make wutwot objects output full-IRI LD and let the consumer
determine how to alias the context, as it saves us from having
to come up with the context prefixes. This will let our api
require full IRIs for types and other added semantic properties without
dealing with context generation.

#### Allow additional JSON-LD properties.

Need to support

- JSON-LD Types in semanticType (prefixed from Context, according to the spec. also allow IRIs?)
- Additional JSON-LD extensions on everything.

If we follow the WOT spec exactly, this means we have to come up with a @context
that prefixes everything. This is difficult, and it would be better if we could
use full IRI keys according to the JSON-LD spec and let the server compact it.

#### IRI IDs.

Currently, ids in wutwot are arbitrary strings, and we turn them into binding-specific urls in wutwot-server.

The WOT spec is web centric, how close do we want to conform to it from
our library?

Implementing it in wutwot-server is nice as that means
the urns can be urls pointing at the actual location of the thing.

Might want to accept a baseUrl property into wutwot and
generate the urls that way.

Bindings are a property of the server though, and we cannot expose
them from wutwot. Maybe we should just cover the core concepts of WOT
and leave the api for server.

WOT examples use a urn specific to physical devices, but we cannot do that as:

- we are not a device registrar churning out hardware, so we don't have a serial number to use.
- We are making virtual devices as well as targeting physical ones.

#### Metadata on properties, actions, events

#### NodeJS events for individual topics

- Thing events
  - Property added / removed
  - Action added / removed
  - Event added / removed
  - Mirror events from individual actions / requests / properties / events?
    - Property updated
    - Action requested / started / cancelled / completed
    - Event raised
      Action events
- Action requestet
  - Mirror events from action requests?
    Action request events
  - started / cancelled / completed
- Property events
  - value updated
- Event events
  - event raised (new record)

#### API documentation

https://www.npmjs.com/package/@microsoft/api-extractor

#### Call remove event sink functions when things are removed.

- Property removal
- Event removal
- Action removal
- Action Request removal

#### Document remaining public types

- Thing
- Property
- Event

#### Load previously defined things even if no plugin has defined them.

DeviceStatus property supplied by internal plugin

- Orphaned
- Present

Maybe make this ConnectionStatus and expose a way for plugins to set it

- Orphaned
- Disconnected
- Sleeping
- Connected

Might not need a property at all, and rely on adding a semanticType of "Orphan" or "Unknown"
