# TODO

#### Support Forms

Currently each binding supplies its own forms. This prevents cross-binding discovery. For example, the directory endpoint
for the express binding cannot list mqtt forms.

There are two ways we would want to set a form

- Per-affordance, for affordance specific forms
- In bulk, for bindings that map any affordance (eg binding-express)

#### Stronger typings for ThingProperty.

- [The Standard](https://w3c.github.io/wot-thing-description/) defines NumericThingProperty, ObjectThingProperty, and so on.

Need to rework ThingProperty to match the W3c DataSchema api.
DataSchema (and rest of W3C TD specific types) should be in new library: `@wutwot/td`

#### Allow additional JSON-LD properties.

Need to support

- JSON-LD Types in semanticType (prefixed from Context, according to the spec. also allow IRIs?)
- Additional JSON-LD extensions on everything.

We emit absolute IRIs for toJSONLD, which makes this a lot easier. We do not have to care
about populating the context, all we need to do is collect the context url and allow arbitrary IRI / value pairs.

`event.addExtensionProperty("http://my-context.com/c/v1", "http://my-context.com/c/terms/foobar", 42);`
`event.addExtensionProperty({context: "http://my-context.com/c/v1", iri: "http://my-context.com/c/terms/foobar"}, 42);`

We then need to pass the contexts up when generating json-ld, might need to change the return type to `{context, document}`.

#### IRI IDs.

Currently, ids in wutwot are arbitrary strings. We pass that as the @id in jsonld, but IDs
should be IRIs. We should generate IRIs in wutwot for ids.

Consider adding an option to wutwot core to choose how to generate ids, or at the very least
clean up and document our urn. Should move all id generation into functions of a single file to
centralize them at the very least.

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
