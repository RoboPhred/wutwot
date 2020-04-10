# TODO

#### The standard has moved on, update to follow it

[The Standard](https://w3c.github.io/wot-thing-description/#http-binding-assertions).

#### Use urn format for thing IDs instead of guids.

Follows [the Standard](https://w3c.github.io/wot-thing-description/#http-binding-assertions).

Could always use guid urn:
`urn:uuid:0393990-393094309-293u3099-9u4209`

WoT docs use this:
`urn:dev:ops:32473-WoTLamp-1234`

URN docs frown upon creating our own urns like this though... but we could.
`urn:moziot:thing:<pluginId>-<pluginLocalId>-<title>`

#### Prevent data from becomming stale.

~~thing.properties, thing.actions, thing.events, action.requests, and event.records become stale after accessed.
Use proxy objects to create a live view into this data that remains read-only.~~

Do we really want to do this? Nothing else in javascript works like this and its a rather
silly use of proxies.

Alternative: Use functions that are allowed to be stale

```
moziot.getAllThingIds()
moziot.getAllThings()
moziot.getThing(id)
```

Alternative 2: Use ReadonlyMap

```
moziot.things.keys()
for(const thing of moziot.things.values()) {}
moziot.things.get("id")
```

Maps are messy with sub-items though, which dont use urns

```
moziot.things.get("urn:foo").events.get("myEvent").records
```

#### Mask private fields on exposed properties / events / actions of PluginThing

We mask public stuff just fine by creating map proxies, but public things
expose the InternalThing props which are not masked. Should move the mask
to them.

#### Ensure actions / events / properties are unique between plugins

As multiple plugins can contribute to a single thing, we need a way to unique the
ids of the actions / events / properties.

Abstracting them as uuids is easiest, but very unfriendly to humans trying to consume
the api.

Specs seems to have human readable names here, but the specs seem to make the assumption
that there is a single cohesive owner of the thing.

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

#### Unify the json-schema variant that WOT uses

WOT spec uses a small subset of JSON Schema. Make types and a validator
for this subset and share them along all usages.

~~This might need a bit of off-spec work, as the spec is inconsistent in how it defines
these. For example, it often defines type can be `object` but does not always define a `properties` property.
Sometimes, the spec shows json-schema properties in an example that it does not define in the spec.~~
This seems to be taken care of in [the new spec](https://w3c.github.io/wot-thing-description/#http-binding-assertions).

#### Call remove event sink functions when things are removed.

- Property removal
- Event removal
- Action removal
- Action Request removal

#### Document remaining public types

- Thing
- Property
- Event
