# TODO

#### The standard has moved on, update to follow it

[The Standard](https://w3c.github.io/wot-thing-description/).

- Follow the spec more closely for affordances
  - Handle affoardances that are poly. ThingProperty is actually NumericThingProperty | ObjectThingProperty and so on.
  - ThingProperty is a subclass of DataSchema
  - Titles and descriptions are all optional
  - Action inputs are optional
- semanticType (@type) can now be string or array of strings for all affordances.

#### Use urns for IDs.

Currently, we implement this in homectrl-server.

The WOT spec is web centric, how close do we want to conform to it from
our library?

Implementing it in homectrl-server is nice as that means
the urns can be urls pointing at the actual location of the thing.

Might want to accept a baseUrl property into moziot and
generate the urls that way.

Bindings are a property of the server though, and we cannot expose
them from moziot. Maybe we should just cover the core concepts of WOT
and leave the api for server.

WOT examples use a urn specific to physical devices, but we cannot do that as:

- we are not a device registrar churning out hardware, so we don't have a serial number to use.
- We are making virtual devices as well as targeting physical ones.

#### Ensure actions / events / properties are unique between plugins

As multiple plugins can contribute to a single thing, we need a way to unique the
ids of the actions / events / properties.

Abstracting them as uuids is easiest, but very unfriendly to humans trying to consume
the api.

Specs seems to have human readable names here, but the specs seem to make the assumption
that each thing is a single cohesive thing.

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
