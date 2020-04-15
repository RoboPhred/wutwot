# TODO

#### The standard has moved on, update to follow it

[The Standard](https://w3c.github.io/wot-thing-description/).

- Follow the spec more closely for affordances
  - Handle affoardances that are poly. ThingProperty is actually NumericThingProperty | ObjectThingProperty and so on.

#### Use urns for Thing IDs.

Currently, we implement this in wutwot-server.

The WOT spec is web centric, how close do we want to conform to it from
our library?

Implementing it in wutwot-server is nice as that means
the urns can be urls pointing at the actual location of the thing.

Might want to accept a baseUrl property into moziot and
generate the urls that way.

Bindings are a property of the server though, and we cannot expose
them from moziot. Maybe we should just cover the core concepts of WOT
and leave the api for server.

WOT examples use a urn specific to physical devices, but we cannot do that as:

- we are not a device registrar churning out hardware, so we don't have a serial number to use.
- We are making virtual devices as well as targeting physical ones.

#### Support extension contexts.

The standard now allows `@context` to be a map. We can make our own contexts for semantic types.
We need to be able to support adding to this when we add a semantic type to an affoardance that uses it.
This should be done automatically, so a property can use a custom type and its context should be
automatically included in the contexts for the thing.

Up until now, we have ignored context on the thing and made the server support that. Perhaps
we need to support it more directly.

This starts to enroach us into the web provider concerns that we avoided with the non-urn IDs...

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
