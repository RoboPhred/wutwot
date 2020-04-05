# TODO

#### Prevent data from becomming stale.

thing.properties, thing.actions, thing.events, action.requests, and event.records become stale after accessed.
Use proxy objects to create a live view into this data that remains read-only.

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

#### Base classes for thing attribute services

Action / event / property services (main, repo, event source/sink) are very similar.

#### Persistent IDs

Store chosen IDs for all concerns in a map file and re-use them on reboot.
Need to accept a more rigerous id from plugins to do this. Keep in mind
some plugins (zwave) will have more than one facet of an id, so accept
an IDClaims interface mapping many values as a compound ID.

Will need to get rid of IDMapper and inject a more robust ID provider.

#### Unify the json-schema variant that WOT uses

WOT spec uses a small subset of JSON Schema. Make types and a validator
for this subset and share them along all usages.
This might need a bit of off-spec work, as the spec is inconsistent in how it defines
these. For example, it often defines type can be `object` but does not always define a `properties` property.
Sometimes, the spec shows json-schema properties in an example that it does not define in the spec.
